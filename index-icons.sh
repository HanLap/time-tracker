#!/usr/bin/env bash


out="src/lib/components/icon/icons.ts"

printf 'export const icons = {\n' > $out

for file in ./node_modules/heroicons/24/outline/*.svg; do
  name=$(basename $file | sed 's/\.svg//')
  printf '  "%s": () => import("heroicons/24/outline/%s.svg?raw"),\n' $name $name >> $out
done

printf '}\n\n' >> $out