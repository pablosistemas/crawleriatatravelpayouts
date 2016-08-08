#!/bin/bash

# Formata os arquivos das requisicoes (JSON) em "[ $JSON ]"
# e grava em arquivo de saida modificado.
# Importa os arquivos no DB

for i in consultas/*; do
	echo "Importing $i";
	STRING=`cat $i`;
	printf "[\n\t$STRING\n]\n" > $i.mod;
	mongoimport --db passagensAereas --collection passagens --type json --file $i.mod --jsonArray	

done
