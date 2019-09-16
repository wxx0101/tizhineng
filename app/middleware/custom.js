module.exports = () => {
  return async (ctx, next) => {
    const {query} = ctx.request;
    for(let i in query){
      if(!isNaN(Number(query[i]))){
        query[i] = Number(query[i]);
      }
    }
    ctx.request.query = query;
    await next();
  };
};