import getMyCollection from "../../../api/mycourse/getMyCollection";
import message from "../../../common/script/utils/message";
import {format} from "../../../common/script/utils/commonUtils";
import addCourseToCart from "../../../api/course/addCourseToCart";

export default class Collection {

  constructor() {
    this.collectionContentUl = document.querySelector('.collection-content .collection-content-ul');
    this.collectionList = null;
    this.showType = undefined;

    this.getMyCollectionInvoker().then(() => this.renderCollectionContent()).catch(() => {});
    // 请求收藏夹，在数据到达之后对收藏夹进行渲染。
  }

  async getMyCollectionInvoker() {
    // 请求收藏夹的网络接口。
    try {
      const res = await getMyCollection({
        headTime: format(new Date(), "yyyy-MM-dd hh:mm:ss"),
        pageNum: 1,
        pageSize: 100,
      });
      this.collectionList = res.data.courseList;
      this.showType = res.data.showType;
      return Promise.resolve();
    } catch (e) {
      message({
        message: `${e.code}: ${e.msg}`,
        type: 'error',
        duration: 1500
      });
      return Promise.reject();
    }
  }

  renderCollectionContent() {
    // 渲染课程内容。
    let collectionContentUlInnerHTML = '';
    if (this.collectionList.length === 0) {
      collectionContentUlInnerHTML += `
        <div style="
          font-size: 34px;
          position:fixed;
          top: calc(50% + 30px);
          left: 50%;
          transform: translate(-50%, -50%);
        ">
          您还没有收藏任何课程
        </div>
      `;
      this.collectionContentUl.innerHTML = collectionContentUlInnerHTML;
    } else {
      if (this.showType === 0) {
        /* 简略排序。*/
        for (let collection of this.collectionList) {
          collectionContentUlInnerHTML += `
          <span class="course-content-li">
            <img src="${collection.cover}" alt="">
            <div class="course-li-info">
              <div class="course-li-info-title">
                ${collection.title}
                ${collection.bought ?
                  `<span class="isBuy">
                    已购买<img src="data:image/svg+xml;base64,PHN2ZyB0PSIxNjM4MTcwMzk4MzY0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMxMDciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNNDMyIDcwOS4yNDhsLTE2Ni42MjQtMTY2LjYyNCA0NS4yNDgtNDUuMjQ4IDEyMS4zNzYgMTIxLjM3NiAyODEuMzc2LTI4MS4zNzYgNDUuMjQ4IDQ1LjI0OEw0MzIgNzA5LjI0OHpNNTEyIDY0QzI2NC41NzYgNjQgNjQgMjY0LjU3NiA2NCA1MTJzMjAwLjU3NiA0NDggNDQ4IDQ0OCA0NDgtMjAwLjU3NiA0NDgtNDQ4Uzc1OS40MjQgNjQgNTEyIDY0eiIgZmlsbD0iIzIxODUwOCIgcC1pZD0iMzEwOCI+PC9wYXRoPjwvc3ZnPg==" alt="">
                   </span>` :
                  `<span class="isBuy">
                    未购买<img src="data:image/svg+xml;base64,PHN2ZyB0PSIxNjM4MTcwMzcyMTA3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI5MzAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNNzEwLjYyNCA2NjUuMzc2bC00NS4yNDggNDUuMjQ4TDUxMiA1NTcuMjQ4bC0xNTMuMzc2IDE1My4zNzYtNDUuMjQ4LTQ1LjI0OEw0NjYuNzUyIDUxMmwtMTUzLjM3Ni0xNTMuMzc2IDQ1LjI0OC00NS4yNDhMNTEyIDQ2Ni43NTJsMTUzLjM3Ni0xNTMuMzc2IDQ1LjI0OCA0NS4yNDhMNTU3LjI0OCA1MTJsMTUzLjM3NiAxNTMuMzc2ek01MTIgNjRDMjY0LjU3NiA2NCA2NCAyNjQuNTc2IDY0IDUxMnMyMDAuNTc2IDQ0OCA0NDggNDQ4IDQ0OC0yMDAuNTc2IDQ0OC00NDhTNzU5LjQyNCA2NCA1MTIgNjR6IiBmaWxsPSIjZDgxZTA2IiBwLWlkPSIyOTMxIj48L3BhdGg+PC9zdmc+" alt="">
                   </span>`
                 }
              </div>
              <div class="studied-or-operation">
                ${collection.bought ?
                  `<a href="http://localhost:8899/html/course.html?courseId=${collection.courseId}">前往学习</a>` :
                  `<button class="add-cart-btn" courseId="${collection.courseId}">加入购物车</button>`
                 }
              </div>
            </div>
          </span>
        `;
        }
        collectionContentUlInnerHTML += `
          <span class="fix-justify">
            <i class="course-content-li"></i>
            <i class="course-content-li"></i>
            <i class="course-content-li"></i>
            <i class="course-content-li"></i>
            <i class="course-content-li"></i>
            <i class="course-content-li"></i>
            <i class="course-content-li"></i>
            <i class="course-content-li"></i>
            <i class="course-content-li"></i>
          </span>
        `;
      } else {
        /* 详情排序。*/



      }
      this.collectionContentUl.innerHTML = collectionContentUlInnerHTML;
      // 给添加商品进购物车以事件绑定。
      const buttons = document.querySelectorAll('button.add-cart-btn');
      for (let btn of buttons) {
        btn.addEventListener('click', async function () {
          const courseId = parseInt(this.getAttribute("courseId"));
          try {
            await addCourseToCart(courseId);
            message({
              message: "添加成功",
              type: "success",
              duration: 1500
            });
          } catch (e) {
            message({
              message: `${e.code}: ${e.msg}`,
              type: 'error',
              duration: 1500
            });
          }
        });
      }
    }
  }
}