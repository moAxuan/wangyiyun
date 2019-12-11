<template>
  <div class="liebiao" >
    <div class="title">
       <h4>我的音乐</h4>
       <span>&gt;</span>
    </div>
    <div class="body">
      <ul class="meMusic">
        <li>我喜欢的音乐</li>
        <li>私人FM</li>
        <li>最嗨电音</li>
        <li>跑步FM</li>
        <li>ACG专区</li>
      </ul>
    </div>
    <div class="title" style="margin-top:10px;">
      <h4>最近播放</h4>
      <span>更多&gt;</span>
    </div>
    <div class="gedanbody">
      <ul class="gedan">
        <li>
          <img src="https://p4.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg" alt="">
          <div>
            <p>全部已播歌曲</p>
            <span>300首</span>
          </div>
        </li>
        <li>
          <img src="https://p4.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg" alt="">
          <div>
            <p>全部已播歌曲全部已播歌曲全部已播歌曲全部已播歌曲全部已播歌曲</p>
            <span>300首</span>
          </div>
        </li>
        <li>
          <img src="https://p4.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg" alt="">
          <div>
            <p>全部已播歌曲</p>
            <span>300首</span>
          </div>
        </li>
        <li>
          <img src="https://p4.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg" alt="">
          <div>
            <p>全部已播歌曲</p>
            <span>300首</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="title" style="margin-top:10px;">
      <div class="usegedan">
        <h4 :class="usegedan == '创建' ? 'active' : ''" @click='usegedan="创建"'>创建歌单(0)</h4>
        <h4 :class="usegedan == '收藏' ? 'active' : ''" @click='usegedan="收藏"'>收藏歌单(0)</h4>
      </div>
      <div class="usegedan">
        <i>+</i>
        <i class="iconfont icon-caidan"></i>
      </div>
    </div>
    <div class="body" v-if="usegedan == '创建'">
      <div style="color:gray;padding:10px 0;text-align:Center;font-size:.8em;border:1px solid #eee;">
        + 导入外部歌单
      </div>
    </div>
    <div class="body" v-if="usegedan == '收藏'">
      <div style="color:gray;padding:40px 0;text-align:Center;font-size:.8em;">
        暂无收藏的歌单
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usegedan:'收藏'
    }
  }
}
</script>

<style scoped lang='scss' type="text/css">
.liebiao {
  width:100vw;
  height:70vh;
  background:white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: 12px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items:center;
    width:90%;
    margin:0 auto;
    padding:10px 0;
    span {
      font-size: .8em;
      color: gray;
    }
    .usegedan {
      display: flex;
      justify-content: space-between;
      h4 {
        margin-right: 15px;
        font-size: 1em;
        color: gray;
        &.active {
          color: black;
        }
      }
      i {
        color: gray;
      }
    }
  }

  .body {
    margin:0 auto;
    overflow: hidden;
    overflow-x: scroll;
    width:90vw;
    .meMusic {
      width:155vw;
      display: flex;
      justify-content: space-between;
      flex-grow:0;
      flex-shrink:0;
      li {
        height:120px;
        width:30vw;
        background:pink;
        color: red;
        line-height: 120px;
        text-align:center;
        font-size:.8em;
        border-radius: 5px;
      }
    }
  }
  .gedanbody {
    margin:0 auto;
    margin:0 auto;
    overflow: hidden;
    overflow-x: scroll;
    width:90vw;
    .gedan {
      display: flex;
      width: 185vw;
      justify-content: space-between;
      flex-grow:0;
      flex-shrink:0;
      li {
        height:50px;
        width:45vw;
        font-size:.7em;
        display: flex;
        align-items: center;
        img {
          width:30%;
          border-radius: 10px;
        }
        div {
          margin-left: 5px;
          span {
           font-size: .6em;
           color: gray;
          }
          p {
            font-size: 1.1em;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical; 
          }
        }  
      }
    }
  }
}
</style>
