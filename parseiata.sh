#!/bin/bash

#tail -n 10 Downloads/residencia/aeroportos.json | awk 'match($0, /^{"_id":{"\$oid":"[a-f0-9]+"}\,"nome":"[A-Za-z ]+"\,"latitude":[0-9]+\.*[0-9]*\,"longitude":[0-9]+\.*[0-9]*\,"codPais":"[A-Za-z]+"\,"regiao":"[A-Z]+-[0-9]+"\,"cidade":"[A-Za-z]+"\,"icao":"[A-Z]+"\,"iata":"([A-Z]+)"}/, arr) {print arr[1]}' 

#tail -n 10 Downloads/residencia/aeroportos.json | perl -n -e '/^{"_id":{"\$oid":"[a-f0-9]+"}\,"nome":"[A-Za-z ]+"\,"latitude":[0-9]+\.*[0-9]*\,"longitude":[0-9]+\.*[0-9]*\,"codPais":"[A-Za-z]+"\,"regiao":"[A-Z]+-[0-9]+"\,"cidade":"[A-Za-z]+"\,"icao":"[A-Z]+"\,"iata":"([A-Z]+)"}/ && print "$1\n"'

FILE="";

while getopts f:h opt; do	
	case "$opt" in
	f)	FILE=$OPTARG;;
	h)	print "Usage: $0 [-h] [-d ] nome do arquivo de entrada ..."
		exit 1;;
	[?])	print "Usage: $0 [-h] [-d ] nome do arquivo de entrada ..."
		exit 1;;
	esac
done

echo $FILE;

if [ ! -e $FILE ]; then
	echo "arquivo nao existe";
	exit 1;
fi

declare -a IATA

IDX=0;

while read line; do
	#TEMP=0;
	TEMP=$(echo $line | perl -n -e '/^{"_id":{"\$oid":"[a-f0-9]+"}\,"nome":"[\w \-\/Ç-Ñ]*"\,"latitude":[+-]*[0-9]*\.*[0-9]*\,"longitude":[+-]*[0-9]*\.*[0-9]*\,"codPais":"[A-Za-z]*"\,"regiao":"[A-Z]*-*[0-9]*"\,"cidade":"[A-Za-z]*"\,"icao":"[A-Z0-9a-z]*"\,"iata":"([A-Z]+)"}/; if(defined $1){ print "$1\n"}');
	echo $TEMP;
	#sleep 1;
	IDX=$(($IDX+1));
done < "$FILE"


for i in `seq 0 $IDX`; do
	echo ${IATA[$i]};
done

# cat Downloads/residencia/aeroportos.json | perl -n -e '/^{"_id":{"\$oid":"[a-f0-9]+"}\,"nome":"[\w \-\/Ç-Ñ]*"\,"latitude":[+-]*[0-9]*\.*[0-9]*\,"longitude":[+-]*[0-9]*\.*[0-9]*\,"codPais":"[A-Za-z]*"\,"regiao":"[A-Z]*-*[0-9]*"\,"cidade":"[A-Za-z]*"\,"icao":"[A-Z0-9a-z]*"\,"iata":"([A-Z]+)"}/ && print "$1\n"';