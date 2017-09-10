#!/bin/bash

HOST_NAME='app-localization-2f645.firebaseapp.com'
TOKEN='2661e040-e825-40d5-ba61-d73f2d111b10'

declare -A LOCALES
LOCALES[en_GB]='strings-en-GB.xml'
LOCALES[de_CH]='strings-de-CH.xml'
LOCALES[fr_CH]='strings-fr-CH.xml'
LOCALES[it_CH]='strings-it-CH.xml'

for locale in "${!LOCALES[@]}"
do
	wget "https://$HOST_NAME/api/export/$locale/android?token=$TOKEN" -O ${LOCALES[$locale]}
done