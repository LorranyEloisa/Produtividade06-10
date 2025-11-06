<#
push-to-github.ps1
Script de auxílio para adicionar/commitar e dar push para um repositório remoto GitHub.
Uso: execute no diretório do projeto com PowerShell (Windows).

O script oferece duas opções de autenticação:
  1) Usar um Personal Access Token (PAT) — o token será usado temporariamente na URL do remote.
  2) Autenticação interativa (o Git abrirá prompt para credenciais / provider instalado).

Aviso de segurança: se escolher fornecer o PAT aqui, ele ficará na memória apenas durante a execução. O script restaura o `origin` para a URL sem token após o push.
#>

param(
  [string]$RemoteUrl = 'https://github.com/LorranyEloisa/Produtividade06-10.git'
)

function Get-GitExe {
  $g = Get-Command git -ErrorAction SilentlyContinue
  if($g){ return $g.Source }
  $candidates = @("$env:USERPROFILE\AppData\Local\Programs\Git\cmd\git.exe","C:\Program Files\Git\cmd\git.exe")
  foreach($p in $candidates){ if(Test-Path $p){ return $p } }
  throw "git not found in PATH and not found in common locations. Install Git or add it to PATH."
}

try{
  $git = Get-GitExe
} catch {
  Write-Error $_.Exception.Message
  exit 1
}

Write-Host "Usando git em: $git"
Write-Host "Remote destino: $RemoteUrl"

# Confirmação do diretório atual
$cwd = Get-Location
Write-Host "Diretório atual: $cwd"

# Opcional: pedir nome/email (se necessário)
if(-not ( & $git config user.name )){
  $name = Read-Host "Enter git user.name to set (press Enter to skip)"
  if($name) { & $git config user.name "$name" }
}
if(-not ( & $git config user.email )){
  $email = Read-Host "Enter git user.email to set (press Enter to skip)"
  if($email) { & $git config user.email "$email" }
}

Write-Host "Adding files and creating commit (if there are changes)..."
& $git add .
# commit may fail if no changes; ignore error code
$commit = & $git commit -m "Initial commit: cadastro page with password strength and confirmation" 2>&1
if($LASTEXITCODE -ne 0){
  Write-Host "Commit skipped or failed (maybe no changes):" -ForegroundColor Yellow
  Write-Host $commit
} else {
  Write-Host "Commit criado."
}

# garantir branch main
& $git branch -M main 2>$null

# perguntar método de autenticação
Write-Host "Escolha método de autenticação para o push:"
Write-Host "1) Usar PAT (Personal Access Token)"
Write-Host "2) Usar autenticação interativa (digite credenciais quando solicitado)"
$choice = Read-Host "Digite 1 ou 2 (padrão 2)"
if($choice -eq '1'){
  # ler PAT de forma segura e converter para string
  $secure = Read-Host "Cole seu PAT (não compartilhe)" -AsSecureString
  $bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  $pat = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr)
  [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)

  # montar remote com token embutido (temporário)
  $uri = [uri]$RemoteUrl
  $authUrl = "https://$($pat)@{0}{1}" -f $uri.Host, $uri.AbsolutePath
  Write-Host "Adicionando remote temporário e efetuando push..." -ForegroundColor Cyan
  # remover remote se existir
  & $git remote remove origin 2>$null
  & $git remote add origin $authUrl
  $push = & $git push -u origin main 2>&1
  $rc = $LASTEXITCODE
  # restaurar remote sem token
  & $git remote set-url origin $RemoteUrl

n  if($rc -eq 0){
    Write-Host "Push realizado com sucesso." -ForegroundColor Green
  } else {
    Write-Error "Push falhou:"; Write-Host $push
  }
} else {
  Write-Host "Tentando push interativo (você será solicitado a autenticar se necessário)..." -ForegroundColor Cyan
  # adicionar remote sem token e push - este requer que o usuário autentique quando solicitado
  
  & $git remote remove origin 2>$null
  & $git remote add origin $RemoteUrl
  $push = & $git push -u origin main 2>&1
  if($LASTEXITCODE -eq 0){
    Write-Host "Push realizado com sucesso." -ForegroundColor Green
  } else {
    Write-Error "Push falhou:"; Write-Host $push
  }
}

Write-Host "Pronto. Verifique o repositório: $RemoteUrl"