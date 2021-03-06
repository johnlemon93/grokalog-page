import moment from 'moment';

const formatPublishedDate = str => {
  const date = moment(str).toDate();
  const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const dateStrs = date.toDateString().split(' ');
  const prettyDateStr = `${dateStrs[0]}, ${dateStrs[1]} ${dateStrs[2]}, ${dateStrs[3]}`;

  return {
    dateStr,
    prettyDateStr,
  };
};

export default {
  'posts': [
    {
      'title': 'Shame on me',
      'url': '/p/shame-on-me/',
      'date': '2019-12-31 23:59:59'
    },
    {
      'title': 'Funny issue với JSON.stringify và Mongoose object',
      'url': '/p/funny-issue-voi-stringify-va-mongoose-object/',
      'date': '2018-10-28 19:19:18'
    },
    {
      'title': 'Phỏng vấn JavaScript người ta hỏi gì? - Phần 1',
      'url': '/p/javascript-interview-part-1/',
      'date': '2018-10-23 20:19:18'
    },
    {
      'title': 'Git cherry pick',
      'url': '/p/git-cherry-pick/',
      'date': '2018-09-22 16:40:02'
    },
    {
      'title': 'JavaScript: Tổng quan về engine, event loop, callback queue...',
      'url': '/p/javascript-tong-quan-ve-engine-runtime-call-stack-va-event-loop/',
      'date': '2018-09-19 11:20:20'
    },
    {
      'title': 'Nhật ký anh bồ câu đưa thư và HTTPS',
      'url': '/p/nhat-ky-anh-bo-cau-dua-thu-va-https/',
      'date': '2018-08-19 17:20:20'
    },
    {
      'title': 'i++ và ++i',
      'url': '/p/i++-vs-++i/',
      'date': '2018-06-22 20:20:20'
    },
    {
      'title': 'Series: Trên trái đất này có hai loại ...',
      'url': '/p/series-tren-trai-dat-nay-co-hai-loai-ba-cham/',
      'date': '2018-06-16 17:07:20'
    },
    {
      'title': 'Debut: Nơi tôi viết lách và ghi chép linh tinh!',
      'url': '/p/debut-chanh-day/',
      'date': '2017-12-31 23:15:55'
    }
  ].map(p => {
    const d = formatPublishedDate(p.date);
    return { ...p, ...d };
  }),
  'years': [
    '2019',
    '2018',
    '2017'
  ]
};