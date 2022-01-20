import ENV from './env';

const { isEnze, isWenFuEr } = ENV;
const configMap = [
  {
    current: false,
    name: '微脉',
    protocolUrl: 'https://m.myweimai.com/yisheng/doctor_consulting_protocol.html', // 开通协议
    serviceStrategy:
      'https://m.myweimai.com/hd/publish/index.d7717bd4cf911dfa3634321d529a745c.html', // 图文咨询服务攻略
  },
  {
    current: isEnze,
    name: '恩泽',
    protocolUrl: 'https://m.myweimai.com/open/enze_doctor_consulting_protocol.html',
    serviceStrategy:
      'https://m.myweimai.com/hd/publish/index.d7717bd4cf911dfa3634321d529a745c.html',
  },
  {
    current: isWenFuEr,
    name: '温附二嗨医生',
    protocolUrl: 'https://m.myweimai.com/hd/publish/cc20d463.html',
    serviceStrategy: 'https://m.myweimai.com/hd/publish/1f5fd635.html',
  },
];

export default configMap.find(i => i.current) || configMap[0];
