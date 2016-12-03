import qiniu from 'qiniu'

qiniu.conf.ACCESS_KEY = 'CsmmAdZSLPMYVx6hmJQfBp4mgOHnDu5TPkl5WLjG'
qiniu.conf.SECRET_KEY = '2pSSx4M19xbzV4_5OAmk3kd_vxFox_Wuzq9acDwB'

function uptoken (bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket + ':' + key)
  return putPolicy.token()
}

function hashCode (str) {
  let hash = 0
  let char
  if (str.length === 0) {
    return hash
  }
  for (let i = 0; i < str.length; i++) {
    char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash
}

export const uploadImage = (filepath) => {
  const bucket = 'parknshop'
  const token = uptoken(bucket, key)
  const key = Math.floor(Date.now() / 1000) + '-' + hashCode(filepath) + '.jpg'

  var extra = new qiniu.io.PutExtra()
  qiniu.io.putFile(token, key, filepath, extra, function (err, ret) {
    if (!err) {
      console.log(ret.hash, ret.key, ret.persistentId)
    } else {
      console.log(err)
    }
  })
}
