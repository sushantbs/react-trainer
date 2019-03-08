FROM nginx
COPY build /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/nginx.conf.template
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf" && nginx -g 'daemon off;'
