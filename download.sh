#!/bin/bash

PROJECT_ID='...'
TOKEN='...'

declare -A LOCALES
LOCALES[en_GB]='strings-en-GB.xml'
LOCALES[de_CH]='strings-de-CH.xml'
LOCALES[fr_CH]='strings-fr-CH.xml'
LOCALES[it_CH]='strings-it-CH.xml'

for locale in "${!LOCALES[@]}"
do
	wget "https://$PROJECT_ID.firebaseapp.com/api/export/$locale/android?token=$TOKEN" -O ${LOCALES[$locale]}
done