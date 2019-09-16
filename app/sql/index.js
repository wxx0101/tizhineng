// 根据对象生成对应的格式的字符串
function getStr(query,pstr, concat){
  let queryArr = [];
  for(let i in query){
    queryArr.push(`${pstr}.${i}${concat}'${query[i]}'`);
  }
  return queryArr;
}

// 联合查询显示招生老师信息

function createTeacherQuery(query, pageSize, pageIndex){
  let condition = getStr(query, 'market_teacher', '=');
  condition.push('market_teacher.orgCode=org_chart.orgCode');
  let pageStr = ` limit ${pageSize}
  offset ${pageSize * (pageIndex - 1)}`;
  if(pageSize === 0 && pageIndex === 0){
    pageStr = '';
  }
  let sql = `
        select 
        market_teacher.id as id,
        market_teacher.name as name,
        market_teacher.sex as sex,
        market_teacher.idCard as idCard,
        market_teacher.graduateSchool as graduateSchool,
        market_teacher.homeAdd as homeAdd,
        market_teacher.recordDate as recordDate,
        market_teacher.referrer as referrer,
        market_teacher.orgCode as orgCode,
        org_chart.orgName as orgName
        from 
        org_chart,market_teacher 
        where ${condition.join(' And ')}
    `;
  return sql + pageStr;
}

// 联合查询学生信息
function createStudentQuery(query, pageSize, pageIndex){
  let condition = getStr(query, 'apply_student', '=');
  condition.push('org_chart.orgCode=apply_student.orgCode');
  condition.push('market_teacher.id=apply_student.teacherId');
  // condition.push('market_teacher.isAble=1');
  // condition.push('org_chart.isAble=1');

  let pageStr = ` limit ${pageSize}
  offset ${pageSize * (pageIndex - 1)}`;
  if(pageSize === 0 && pageIndex === 0){
    pageStr = '';
  }
  
  const sql = `
    select
    apply_student.sid as sid,
    apply_student.name as studentName,
    apply_student.idCard as idCard,
    apply_student.birthday as birthday,
    apply_student.education as education,
    apply_student.tel as tel,
    apply_student.email as email,
    apply_student.place as plce,
    apply_student.homeAddress as homeAddress,
    apply_student.orgCode as orgCode,
    apply_student.teacherId as teacherId,
    apply_student.isRecommend as isRecommend,
    apply_student.recommendName as recommendName,
    apply_student.recommendCard as recommendCard,
    apply_student.recommendTel as recommendTel,
    apply_student.notes as notes,
    org_chart.orgName as orgName,
    market_teacher.name as teacherName
    from 
    apply_student,market_teacher,org_chart 
    where
    ${condition.join(' And ')}`;
  return sql + pageStr;
}


// 获取所有用户
function getAllUserQuery(){
  let sql = `select * from user,identity where user.isAble=1 
  And user.identity=identity.id 
  `;
  return sql;
}

// 获取所有身份
function getAllIdentityQuert(){
  let sql = `
    select * from identity where identity.isAble=1
  `;
  return sql;
}
// 获取属于该身份的所有用户
function getUserFromIdentity(identityId){
  let sql = `
    select * from user where 
    user.identity=${identityId} And user.isAble=1
  `;
  return sql;
}
// 获取属于该身份的所有权限
function getAuthorityFromIdentity(identityId){
  let sql = `
    select * from identity_autho where
    identity_id=${identityId} And isAble=1
  `;
  return sql;
}
module.exports = {
  createTeacherQuery,
  createStudentQuery,
  getAllUserQuery,
  getAllIdentityQuert,
  getUserFromIdentity,
  getAuthorityFromIdentity
};