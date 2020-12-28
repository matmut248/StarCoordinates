# IntervalTrees

Muti Mattia, Minerva Mattia.

[matmut248/IntervalTree.jl: Progetto Calcolo Parallelo e Distribuito 2020
(github.com)](https://github.com/matmut248/IntervalTree.jl)

Analisi, revisione e testing della funzione
spaceindex(model::Lar.LAR)::Array{Array{Int,1},1}

nel file
<https://github.com/cvdlab/LinearAlgebraicRepresentation.jl/blob/master/src/refactoring.jl>

## Analisi Preliminare

Grafo delle funzioni:

![](media/130fb3c3dfc179d5e135de23752d3191.jpg)

Analisi input e output:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
boundingBox prende in input un vertice di tipo Lar.Points cioè una matrice MxN dove M è la dimensione dello spazio in analisi e N è il numero di vertici, restituisce in output due array che indicano gli estremi del bounding box.
coordIntervals Prende in input un array di array (i bounding box) e un intero che serve a specificare su quale coordinata si sta lavorando, restituisce in output un dizionario ordinato.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-   Boxcovering prende in input un array di array (i bounding box), un intero
    che indica su quale coordinata si sta lavorando, e un intervalTrees,
    Restituisce in output un array di array che contiene tutte le intersezioni
    tra bounding box.

-   spaceIndex prende in input una tupla costituita da una matrice che contiene
    i punti del modello, e da un array di array che contiene le celle cioè
    scomposizioni dello spazio geometrico (vertici, lati, facce...). Restituisce
    un array di array dove l'elemento i-esimo rappresenta quali intersezioni ha
    il bounding box i-esimo con gli altri bounding box.

## Relazione di progetto

Descrizione dei task:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
boundingBox serve a creare il bounding Box di un segmento, cioè la scatola di misura più piccola (area, volume, ipervolume) entro cui sono contenuti tutti i punti.
coordIntervals crea un dizionario ordinato dove la chiave è l'intervallo sulla singola coordinata, mentre il valore associato è un array di indici che indicano a quali bounding box si riferiscono.
boxCovering calcola quali bounding box si intersecano tra di loro.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-   spaceIndex dato un modello geometrico, calcola le intersezioni tra i
    bounding box. Nello specifico la funzione calcola le 1-celle e il loro
    bounding box attraverso la funzione boundingBox. Si suddividono le
    coordinate *x* e *y* in due dizionari chiamando la funzione coordintervals.
    Per entrambe le coordinate *x* e *y*, si calcola un intervalTree cioè una
    struttura dati che contiene intervalli. La funzione boxCovering viene
    chiamata per calcolare le sovrapposizioni sulle singole dimensioni dei
    bounding Box. Intersecando quest’ultime, si ottengono le intersezioni
    effettive tra bounding box. La funzione esegue lo stesso procedimento sulla
    coordinata *z* se presente. Infine, si eliminano le intersezioni di ogni
    bounding box con loro stessi.

Suddivisione delle funzioni in mono-task:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
addIntersection!(covers::Array{Array{Int64,1},1}, i::Int, iterator)   	    aggiunge gli elementi di iterator nell’i-esimo array di covers.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-   createIntervalTree(boxdict::AbstractDict{Array{Float64,1},Array{Int64,1}})dato
    un dizionario ordinato crea un intervalTree cioè una struttura dati che
    contiene intervalli e che consente di trovare in modo efficiente tutti gli
    intervalli che si sovrappongono a un determinato intervallo o punto.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
removeSelfIntersection!(covers::Array{Array{Int64,1},1}) 		          		 elimina le intersezioni di ogni bounding box con loro stessi.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

![](media/191fa7b6c08fd9f59a40f2f834554c34.jpg)
