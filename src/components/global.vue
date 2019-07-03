
<script>
export default {
  //学号
  activeIndex: "1", //顶部导航
  isAdmin: false, //是否为管理员
  // username: 201721314106,

  //综测年份
  _year: "2018",
  // img0: "http://cdn.i7code.cn/zc-201721314106-2017-1",
  // img1: "http://cdn.i7code.cn/zc-201721314106-2017-2",
  //学生基础信息
  // stu_info: undefined,
  // //原创成绩数据 来自教务系统
  // originalScore: undefined,
  // stu_score: undefined,

  // stu_info: {
  //   academy: "计算科学学院",
  //   class_name: "信计171",
  //   stuent_name: "陈远生",
  //   stuent_id: "201721314106",
  //   input_time: "2019-12-11"
  // },

  methods: {
    created() {
      console.log("global123123213");
    }
  }
  //成绩
  // stu_score: [
  //   {
  //     jd: "1.3",
  //     is_hand: false,
  //     score_jd: "2.60",
  //     class_name: "[080776]大学英语Ⅰ",
  //     class_rank: "及格",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/公共课",
  //     class_score: "63.00",
  //     class_credit: "2.0"
  //   },
  //   {
  //     jd: "1.2",
  //     is_hand: false,
  //     score_jd: "1.20",
  //     class_name: "[130097]体育I",
  //     class_rank: "及格",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/公共课",
  //     class_score: "62.00",
  //     class_credit: "1.0"
  //   },
  //   {
  //     jd: "3.6",
  //     is_hand: false,
  //     score_jd: "3.60",
  //     class_name: "[160709]职业生涯规划",
  //     class_rank: "良好",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/公共课",
  //     class_score: "86.00",
  //     class_credit: "1.0"
  //   },
  //   {
  //     jd: "4.0",
  //     is_hand: false,
  //     score_jd: "4.00",
  //     class_name: "[160911]大学生心理健康教育",
  //     class_rank: "优秀",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/公共课",
  //     class_score: "90.00",
  //     class_credit: "1.0"
  //   },
  //   {
  //     jd: "2.0",
  //     is_hand: false,
  //     score_jd: "4.00",
  //     class_name: "[320226]大学信息技术基础",
  //     class_rank: "中等",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/公共课",
  //     class_score: "70.00",
  //     class_credit: "2.0"
  //   },
  //   {
  //     jd: "3.6",
  //     is_hand: false,
  //     score_jd: "7.20",
  //     class_name: "[330092]中国近现代史纲要",
  //     class_rank: "良好",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/公共课",
  //     class_score: "86.00",
  //     class_credit: "2.0"
  //   },
  //   {
  //     jd: "4.5",
  //     is_hand: false,
  //     score_jd: "9.00",
  //     class_name: "[330093]军事理论",
  //     class_rank: "优秀",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/公共课",
  //     class_score: "95.02",
  //     class_credit: "2.0"
  //   },
  //   {
  //     jd: "1.5",
  //     is_hand: false,
  //     score_jd: "5.25",
  //     class_name: "[110852]高等代数",
  //     class_rank: "及格",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/学科基础课",
  //     class_score: "65.00",
  //     class_credit: "3.5"
  //   },
  //   {
  //     jd: "1.0",
  //     is_hand: false,
  //     score_jd: "3.00",
  //     class_name: "[111005]数学分析（1）",
  //     class_rank: "及格",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/学科基础课",
  //     class_score: "60.00",
  //     class_credit: "3.0"
  //   },
  //   {
  //     jd: "1.6",
  //     is_hand: false,
  //     score_jd: "4.00",
  //     class_name: "[111015]Java语言程序设计I",
  //     class_rank: "及格",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/学科基础课",
  //     class_score: "66.00",
  //     class_credit: "2.5"
  //   },
  //   {
  //     jd: "4.2",
  //     is_hand: false,
  //     score_jd: "4.20",
  //     class_name: "[110956]专业导论",
  //     class_rank: "优秀",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/专业课",
  //     class_score: "91.91",
  //     class_credit: "1.0"
  //   },
  //   {
  //     jd: "1.0",
  //     is_hand: false,
  //     score_jd: "2.00",
  //     class_name: "[080815]大学英语Ⅱ",
  //     class_rank: "及格",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "必修课/公共课",
  //     class_score: "60.00",
  //     class_credit: "2.0"
  //   },
  //   {
  //     jd: "3.0",
  //     is_hand: false,
  //     score_jd: "6.00",
  //     class_name: "[111020]创新创业教育基础",
  //     class_rank: "良好",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "必修课/公共课",
  //     class_score: "80.00",
  //     class_credit: "2.0"
  //   },
  //   {
  //     jd: "2.4",
  //     is_hand: false,
  //     score_jd: "2.40",
  //     class_name: "[130098]体育II",
  //     class_rank: "中等",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "必修课/公共课",
  //     class_score: "74.00",
  //     class_credit: "1.0"
  //   },
  //   {
  //     jd: "1.8",
  //     is_hand: false,
  //     score_jd: "5.40",
  //     class_name: "[330119]思想道德修养与法律基础",
  //     class_rank: "及格",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "必修课/公共课",
  //     class_score: "68.00",
  //     class_credit: "3.0"
  //   },
  //   {
  //     jd: "1.6",
  //     is_hand: false,
  //     score_jd: "8.00",
  //     class_name: "[110964]数学分析（2）",
  //     class_rank: "及格",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "必修课/学科基础课",
  //     class_score: "66.00",
  //     class_credit: "5.0"
  //   },
  //   {
  //     jd: "1.2",
  //     is_hand: false,
  //     score_jd: "3.60",
  //     class_name: "[111016]Java语言程序设计II",
  //     class_rank: "及格",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "必修课/学科基础课",
  //     class_score: "62.00",
  //     class_credit: "3.0"
  //   },
  //   {
  //     jd: "3.5",
  //     is_hand: false,
  //     score_jd: "3.50",
  //     class_name: "[110579]程序设计实践",
  //     class_rank: "良好",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "课程设计",
  //     class_score: "85.02",
  //     class_credit: "1.0"
  //   },
  //   {
  //     jd: "2.6",
  //     is_hand: false,
  //     score_jd: "2.60",
  //     class_name: "[000254]（网络课）走近《红楼梦》",
  //     class_rank: "中等",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "任选课/公共课",
  //     class_score: "76.00",
  //     class_credit: "1.0"
  //   },
  //   {
  //     jd: "3.9",
  //     is_hand: false,
  //     score_jd: "3.90",
  //     class_name: "[000269]（网络课）生活心理学",
  //     class_rank: "良好",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "任选课/公共课",
  //     class_score: "89.00",
  //     class_credit: "1.0"
  //   },
  //   {
  //     jd: "4.5",
  //     is_hand: false,
  //     score_jd: "4.50",
  //     class_name: "[080634]英语国家社会与文化入门",
  //     class_rank: "优秀",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "任选课/公共课",
  //     class_score: "95.02",
  //     class_credit: "1.0"
  //   },
  //   {
  //     jd: "3.5",
  //     is_hand: false,
  //     score_jd: "3.50",
  //     class_name: "[240903]公共关系学",
  //     class_rank: "良好",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "任选课/公共课",
  //     class_score: "85.02",
  //     class_credit: "1.0"
  //   },
  //   {
  //     jd: "1.9",
  //     is_hand: false,
  //     score_jd: "6.65",
  //     class_name: "[110967]离散数学",
  //     class_rank: "及格",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "限选课/学科基础课",
  //     class_score: "69.00",
  //     class_credit: "3.5"
  //   }
  // ],
  // img0: "http://cdn.i7code.cn/zc-201721314106-2017-1",
  // img1: "http://cdn.i7code.cn/zc-201721314106-2017-2",

  // originalScore: [
  //   {
  //     jd: "1.3",
  //     is_hand: false,
  //     score_jd: "2.60",
  //     class_name: "[080776]大学英语Ⅰ",
  //     class_rank: "及格",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/公共课",
  //     class_score: "63.00",
  //     class_credit: "2.0"
  //   },
  //   {
  //     jd: "1.2",
  //     is_hand: false,
  //     score_jd: "1.20",
  //     class_name: "[130097]体育I",
  //     class_rank: "及格",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/公共课",
  //     class_score: "62.00",
  //     class_credit: "1.0"
  //   },
  //   {
  //     jd: "3.6",
  //     is_hand: false,
  //     score_jd: "3.60",
  //     class_name: "[160709]职业生涯规划",
  //     class_rank: "良好",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/公共课",
  //     class_score: "86.00",
  //     class_credit: "1.0"
  //   },
  //   {
  //     jd: "4.0",
  //     is_hand: false,
  //     score_jd: "4.00",
  //     class_name: "[160911]大学生心理健康教育",
  //     class_rank: "优秀",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/公共课",
  //     class_score: "90.00",
  //     class_credit: "1.0"
  //   },
  //   {
  //     jd: "2.0",
  //     is_hand: false,
  //     score_jd: "4.00",
  //     class_name: "[320226]大学信息技术基础",
  //     class_rank: "中等",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/公共课",
  //     class_score: "70.00",
  //     class_credit: "2.0"
  //   },
  //   {
  //     jd: "3.6",
  //     is_hand: false,
  //     score_jd: "7.20",
  //     class_name: "[330092]中国近现代史纲要",
  //     class_rank: "良好",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/公共课",
  //     class_score: "86.00",
  //     class_credit: "2.0"
  //   },
  //   {
  //     jd: "4.5",
  //     is_hand: false,
  //     score_jd: "9.00",
  //     class_name: "[330093]军事理论",
  //     class_rank: "优秀",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/公共课",
  //     class_score: "95.02",
  //     class_credit: "2.0"
  //   },
  //   {
  //     jd: "1.5",
  //     is_hand: false,
  //     score_jd: "5.25",
  //     class_name: "[110852]高等代数",
  //     class_rank: "及格",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/学科基础课",
  //     class_score: "65.00",
  //     class_credit: "3.5"
  //   },
  //   {
  //     jd: "1.0",
  //     is_hand: false,
  //     score_jd: "3.00",
  //     class_name: "[111005]数学分析（1）",
  //     class_rank: "及格",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/学科基础课",
  //     class_score: "60.00",
  //     class_credit: "3.0"
  //   },
  //   {
  //     jd: "1.6",
  //     is_hand: false,
  //     score_jd: "4.00",
  //     class_name: "[111015]Java语言程序设计I",
  //     class_rank: "及格",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/学科基础课",
  //     class_score: "66.00",
  //     class_credit: "2.5"
  //   },
  //   {
  //     jd: "4.2",
  //     is_hand: false,
  //     score_jd: "4.20",
  //     class_name: "[110956]专业导论",
  //     class_rank: "优秀",
  //     class_team: "2017-2018学年第一学期",
  //     class_type: "必修课/专业课",
  //     class_score: "91.91",
  //     class_credit: "1.0"
  //   },
  //   {
  //     jd: "1.0",
  //     is_hand: false,
  //     score_jd: "2.00",
  //     class_name: "[080815]大学英语Ⅱ",
  //     class_rank: "及格",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "必修课/公共课",
  //     class_score: "60.00",
  //     class_credit: "2.0"
  //   },
  //   {
  //     jd: "3.0",
  //     is_hand: false,
  //     score_jd: "6.00",
  //     class_name: "[111020]创新创业教育基础",
  //     class_rank: "良好",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "必修课/公共课",
  //     class_score: "80.00",
  //     class_credit: "2.0"
  //   },
  //   {
  //     jd: "2.4",
  //     is_hand: false,
  //     score_jd: "2.40",
  //     class_name: "[130098]体育II",
  //     class_rank: "中等",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "必修课/公共课",
  //     class_score: "74.00",
  //     class_credit: "1.0"
  //   },
  //   {
  //     jd: "1.8",
  //     is_hand: false,
  //     score_jd: "5.40",
  //     class_name: "[330119]思想道德修养与法律基础",
  //     class_rank: "及格",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "必修课/公共课",
  //     class_score: "68.00",
  //     class_credit: "3.0"
  //   },
  //   {
  //     jd: "1.6",
  //     is_hand: false,
  //     score_jd: "8.00",
  //     class_name: "[110964]数学分析（2）",
  //     class_rank: "及格",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "必修课/学科基础课",
  //     class_score: "66.00",
  //     class_credit: "5.0"
  //   },
  //   {
  //     jd: "1.2",
  //     is_hand: false,
  //     score_jd: "3.60",
  //     class_name: "[111016]Java语言程序设计II",
  //     class_rank: "及格",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "必修课/学科基础课",
  //     class_score: "62.00",
  //     class_credit: "3.0"
  //   },
  //   {
  //     jd: "3.5",
  //     is_hand: false,
  //     score_jd: "3.50",
  //     class_name: "[110579]程序设计实践",
  //     class_rank: "良好",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "课程设计",
  //     class_score: "85.02",
  //     class_credit: "1.0"
  //   },
  //   {
  //     jd: "2.6",
  //     is_hand: false,
  //     score_jd: "2.60",
  //     class_name: "[000254]（网络课）走近《红楼梦》",
  //     class_rank: "中等",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "任选课/公共课",
  //     class_score: "76.00",
  //     class_credit: "1.0"
  //   },
  //   {
  //     jd: "3.9",
  //     is_hand: false,
  //     score_jd: "3.90",
  //     class_name: "[000269]（网络课）生活心理学",
  //     class_rank: "良好",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "任选课/公共课",
  //     class_score: "89.00",
  //     class_credit: "1.0"
  //   },
  //   {
  //     jd: "4.5",
  //     is_hand: false,
  //     score_jd: "4.50",
  //     class_name: "[080634]英语国家社会与文化入门",
  //     class_rank: "优秀",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "任选课/公共课",
  //     class_score: "95.02",
  //     class_credit: "1.0"
  //   },
  //   {
  //     jd: "3.5",
  //     is_hand: false,
  //     score_jd: "3.50",
  //     class_name: "[240903]公共关系学",
  //     class_rank: "良好",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "任选课/公共课",
  //     class_score: "85.02",
  //     class_credit: "1.0"
  //   },
  //   {
  //     jd: "1.9",
  //     is_hand: false,
  //     score_jd: "6.65",
  //     class_name: "[110967]离散数学",
  //     class_rank: "及格",
  //     class_team: "2017-2018学年第二学期",
  //     class_type: "限选课/学科基础课",
  //     class_score: "69.00",
  //     class_credit: "3.5"
  //   }
  // ],
};
</script>

