import Document, {Head, Main, NextScript } from 'next/document'

export default class SiteDocument extends Document {
  render () {
    return (
      <html lang="ja">
        <Head>
          <meta charSet='utf-8' />
        </Head>  
        <body style={{background: '#1b1c1d'}}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
