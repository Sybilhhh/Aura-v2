// 填入真实链接后，页面按钮自动启用。Demo 的 video / poster 可用相对路径。
window.AURA_CONTENT = {
  resources: [
    {label:'Hugging Face',url:''},{label:'GitHub',url:''},
    {label:'Technical Report',url:''},{label:'Dataset',url:''}
  ],
  data: [
    {name:'主动服务',percent:35,color:'#557ba7',detail:'事件触发、长时等待、无需回应、任务取消与意图变化'},
    {name:'工具调用',percent:25,color:'#8ba5c5',detail:'工具选择、参数填充、执行结果、失败恢复与无需调用'},
    {name:'Grounding',percent:25,color:'#b7c8dd',detail:'对象指代、空间定位、遮挡重现与时序证据关联'},
    {name:'联合场景',percent:15,color:'#d5deeb',detail:'同一任务内联合标注触发时机、目标对象与行动'}
  ],
  demos: [
    {id:'market',title:'逛超市',kind:'coupled',tags:['proactive','tool','grounding'],art:'market',color:'#dfe6d4',desc:'找到目标商品，结合需求查询信息并适时提醒。',steps:['观察货架，识别用户关注的商品。','定位具体商品，按任务需要查询商品信息。','结合查询结果和用户需求给出提示。'],video:'',poster:''},
    {id:'gallery',title:'逛画展',kind:'coupled',tags:['proactive','tool','grounding'],art:'gallery',color:'#e9e1d4',desc:'知道你在看哪幅画，在合适的时候提供讲解。',steps:['定位用户当前观看的画作。','根据可识别线索查询作品资料。','在用户停留时提供简洁讲解，切换画作后更新对象。'],video:'',poster:''},
    {id:'coffee',title:'做咖啡',kind:'coupled',tags:['proactive','tool','grounding'],art:'coffee',color:'#d9e2d2',desc:'观察当前步骤，指向操作对象，按需启动计时。',steps:['观察注水动作，等待动作结束。','定位滤杯，确认当前所处阶段。','依据任务要求调用计时器，给出下一步提醒。'],video:'',poster:''},
    {id:'airport',title:'机场指导',kind:'coupled',tags:['proactive','tool','grounding'],art:'airport',color:'#dce5e5',desc:'结合现场指示牌与行程信息，帮助找到下一步。',steps:['观察机场标识并关联当前目的地。','按用户授权查询相关航班或登机口信息。','定位应关注的指示牌，给出下一步路线提示。'],video:'',poster:''},
    {id:'outfit',title:'Outfit · 穿搭 0Q1A',kind:'coupled',tags:['proactive','grounding'],art:'outfit',color:'#e5dfe4',desc:'观察整体搭配，围绕具体单品主动给出一次建议。',steps:['在用户同意的穿搭辅助场景中观察。','关联服饰、颜色与搭配需求。','指向具体单品，给出一次简洁的搭配建议。'],video:'',poster:''},
    {id:'mbti',title:'MBTI / 面相 · 娱乐 0Q1A',kind:'coupled',tags:['proactive'],art:'face',color:'#e6e3d6',desc:'作为趣味互动的扩展场景，不作真实人格判断。',steps:['明确告知用户这是娱乐互动。','结合用户自述与偏好展开话题。','主动提供一次趣味回应，不根据外貌推断真实人格。'],video:'',poster:''}
  ]
};
