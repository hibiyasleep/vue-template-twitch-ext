#!/usr/bin/env bash
NAME=${1:-server}
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
openssl req \
  -newkey rsa:4096 \
  -days 1001 \
  -nodes \
  -x509 \
  -subj "/C=US/ST=California/L=San Francisco/O=LULZCorp/OU=web/CN=localhost" \
  -extensions SAN \
  -config <( cat $( [[ "Darwin" = "$(uname -s)" ]]  && echo /System/Library/OpenSSL/openssl.cnf || echo /etc/ssl/openssl.cnf  ) \
    <(printf "[SAN]\nsubjectAltName='DNS:localhost'")) \
  -keyout "~/.twitch-ext-certs/${NAME}.key" \
  -out "~/.twitch-ext-certs/${NAME}.crt"

echo ""
echo "* Generated $NAME.key and $NAME.crt files in local directory"
echo ""

if [[ "$OSTYPE" == "darwin"* ]]; then
  echo "* Installing cert into local Keychain."
  echo "* To see or modify, run 'Keychain Access' app and look in the 'System' Folder"
  sudo security add-trusted-cert -d -p ssl -r trustRoot -k "/Library/Keychains/System.keychain" "~/.twitch-ext-certs/${NAME}.crt"
else
  echo "* Please install and trust cert at conf/$NAME.crt"
fi
cd "$DIR"
if [[ ! -d "~/.twitch-ext-certs/" ]]; then
  mkdir "~/.twitch-ext-certs"
fi
mv ${NAME}.{key,crt} "~/.twitch-ext-certs/"
