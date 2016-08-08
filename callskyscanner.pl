use strict;
use warnings;
use WWW::Curl::Easy;

# Le os codigos IATA de arquivo de entrada e invoca
# getnode.js passando IATAS de origem e destino como parâmetro
# Modo de uso: perl callskyscanner.pl

my $ARQIATAS = "arqIataFinal";

open (my $fh, "<", $ARQIATAS) or die "Arquivo nao encontrado";

my $data = <$fh>;
my @iata;
while($data){

	chomp($data);
	
	push @iata, $data;
	
	$data = <$fh>;
}

#open (my $fh, "<", "cidades") or die "Arquivo nao encontrado";
#my $data;
#my @iata;
#while($data = <$fh>){		
	#print $1,"\n";
	#chomp($data);
	#push @iata, $data;
#}

#close($fh);

foreach my $iata (@iata){
	print $iata,"\n";
}

my $consulta;

for(my $i = 0; $i < scalar @iata; $i++){
	for(my $j = 0; $j < scalar @iata; $j++){
		if($i != $j){
			#my @args = ("node", "reqskyscanner.js", "$iata[$i]", "$iata[$j]");
			my @args = ("node", "getnode.js", "$iata[$i]", "$iata[$j]");
			system (@args); 		
		}
	}
}