const config = {
  env: process.env.NEXT_PUBLIC_NODE_ENV,
  serverApi: process.env.NEXT_PUBLIC_SERVER_API as string,
  serverURl: process.env.NEXT_PUBLIC_SERVER_URL as string,
  clientApi: process.env.NEXT_PUBLIC_BASE_CLIENT_SERVER as string,
  main_domain: process.env.NEXT_PUBLIC_MAIN_DOMAIN,
  base_url: process.env.NEXT_PUBLIC_BASE_URL,
  authSecret: process.env.NEXTAUTH_SECRET,
  base_client_url: process.env.NEXT_PUBLIC_BASE_CLIENT_URL,
  courier_api_key: process.env.NEXT_PUBLIC_COURIER_API_KEY,
  courier_secret_key: process.env.NEXT_PUBLIC_COURIER_SECRET_KEY,
  token_data: {
    access_token_cookie_expires:
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_COOKIE_EXPIRES,
  },
};

export default config;
