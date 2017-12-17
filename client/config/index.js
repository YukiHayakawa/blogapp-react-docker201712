module.exports = {
  app: {
    title: 'BLOG APP',
    imageServerHost: 'http://localhost:8000',
    apiServerHost: 'http://localhost:8080',
    siteUrl: 'http://localhost:3030',
  },
  authForm: {
    validationMsg: {
      req: '入力してください',
      email: 'メールアドレスの形式が違います',
      emailUniq: 'すでに使用されているメールアドレスです'
    }
  },
  blogForm: {
    state: {
      public: '公開',
      save: '保存',
      delete: '削除'
    }
  }
}
