# ADR 0003: Vídeo próprio em `public/video/`, VP9 e H.264 nível 4.0 com poster

Status: aceito
Data: 2026-08-18 (registrado em 2026-10-09)

## Contexto

O hero e o Sobre usam vídeo gravado no consultório. O material bruto vem do celular, vertical e pesado. O vídeo precisa tocar sozinho, mudo, em iPhone, Android e computador, sem player de terceiro e sem depender de serviço pago.

## Decisão

- Os arquivos transcodificados ficam em `public/video/`: WebM (VP9) primeiro, MP4 (H.264 High, **nível 4.0**, bitrate limitado) como alternativa, e um poster em WebP que faz a primeira pintura.
- O material bruto fica em `media/`, ignorado pelo git.
- `preload="metadata"`, `muted`, `playsInline`; o `play()` recusado tenta de novo até três vezes quando chegam mais dados; depois disso, a recusa é política do aparelho (modo de economia de energia) e o poster é a resposta certa.
- Com `prefers-reduced-motion`, o vídeo não toca; fica o poster.
- Cada vídeo é dimensionado pelo tamanho de exibição (hero em tela cheia, ~4,2 MB; kit em painel, ~260 KB).

## Alternativas consideradas

- YouTube ou Vimeo embutidos: interface do player, marca de terceiro, peso de script e cookies, num vídeo que é decorativo.
- Só H.264: um arquivo a menos, mas o VP9 é 11% menor para quem decodifica. Foi tentado em 8856b6a e revertido em 851c602, quando ficou claro que a falha no iPhone era o modo de economia de energia, não o WebM.
- H.264 no nível que o ffmpeg escolhe: saiu nível 5.0, que o iOS não decodifica (87df56e).

## Consequências

- Todo vídeo novo passa pelo mesmo processo: recorte, transcodificação em dois formatos, nível 4.0 fixo no H.264, poster.
- Peso de vídeo entra na conta do LCP; o poster precisa ser leve.
- Vídeo que se repete por mais de 5 s precisa de pausa (WCAG 2.2.2) e para quando sai da tela.
