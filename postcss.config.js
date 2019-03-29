module.exports = {
  plugins: [
    require('autoprefixer')({
      flexbox: 'no-2009'
    }),
    require('postcss-pxtorem')({
      rootValue: 75,
      propList: ['*', '!font*']
    })
  ]
}