import Head from 'next/head'

export default ({ headTitle }) => {
  return (
    <div>
      <Head>
        <title>{headTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css' />
      </Head>
    </div>
  );
}
