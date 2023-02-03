//La conception de la classe Queen fait le choix que la position des pièces est connue par classe Board (et non par Queen). Discuter de l’intérêt de ce choix de conception (avantages et inconvénients).

// Les deplacements de Queen dépendent des mouvements légaux de Queen en plus de la position des autres pièces qui peuvent bloquer ces mouvements. Il faudrait donc que Queen ait connaissance de l'entièreté des pièces présentes sur l'échiqier. Toutes les autres pièces nécessiteraient de fonctionner ainsi.
// Un mouvement d'une pièce entraînerait une mise à jour de l'échiquier non seulement de Board mais aussi de chaque pièce.
// Il est plus raisonable de laisser le filtrage à Board parmi les mouvemnt légaux d'une pièce et de laisser à Board le soin de gérer l'échiquier.