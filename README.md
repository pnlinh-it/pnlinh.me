```yml
version: "3.8"

services:
  pnlinh-me:
    image: ghcr.io/pnlinh-it/pnlinh-me:latest
    container_name: pnlinh-me
    restart: always
    networks:
      - pnlinh-me
      - proxy
    environment:
      VIRTUAL_HOST: pnlinh.me
      LETSENCRYPT_HOST: pnlinh.me

networks:
  pnlinh-me:
    name: pnlinh-me
    driver: bridge

  proxy:
    external: true
    name: proxy

```
