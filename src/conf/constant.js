/**
 * @description:常量集合
 */
module.exports = {
    DEFAULT_PICTURE: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=550723927,1346838877&fm=27&gp=0.jpg',
    DEFAULT_PAGE_SIZE: 5,
    //匹配 '@nickName-userName'
    // . 匹配任意字符  +： 匹配多个  ？：贪婪匹配。匹配完立马结束  \s 遇到空格 立马结束
    REG_FOR_AT_WHO: /@(.+?)\s-\s(\w+?)\b/g
}