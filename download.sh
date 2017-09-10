#!/bin/bash

HOST_NAME='...' # e.g. localization.firebaseapp.com
TOKEN='...' # e.g. 1f1536e7-25c9-4062-8072-f7469baf1513

declare -A LOCALES
LOCALES[en_GB]='strings-en-GB.xml'
LOCALES[de_CH]='strings-de-CH.xml'
LOCALES[fr_CH]='strings-fr-CH.xml'
LOCALES[it_CH]='strings-it-CH.xml'

for locale in "${!LOCALES[@]}"
do
	wget "https://$HOST_NAME/api/export/$locale/android?token=$TOKEN" -O ${LOCALES[$locale]}
done