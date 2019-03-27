import getFeedback from '../../../utils/adminAPI'

export default {
  name: 'checkFeedback',
  data(){
    const generateData2 = _ => {
      const data = [];
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
      const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        });
      });
      return data;
    };
    return {
      data2: generateData2(),
      value2: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      }
    };
  },
  msgList: [
    {
      stuName: '',
      contact: '',
      remark: '',
      isHandle: false
    }
  ],
  mounted () {
    this.$nextTick(() => {
      this.getFeedback()
    })
  }
}
