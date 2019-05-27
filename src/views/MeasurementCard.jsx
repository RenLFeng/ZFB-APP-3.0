import React, { Component } from 'react'
import '../assets/css/common.css'
import '../assets/css/protocol.css'

class MeasurementCard extends Component {
  render() {
    return (
      <div className="lineinfo">
        <p className="line font">特别提示：</p>
        <p className="font">
        为了保障您的合法权益，您应当阅读并遵守本授权书。请您务必审慎阅读，并充分理解本授权书的全部内容，特别是以加粗形式提示您注意的。
        </p>

        <p className="font">
        若您不接受本授权书的任何条款，请您立即停止授权。若您未停止授权，或进行了其他相关操作等同于同意授权的，均视为您已阅读并接受本授权书的约束。
        </p>

        <p className="font">本人清楚理解以下授权的含义并同意授权贵司进行以下事项：</p>

        <p className="font">
        （一）同意授权贵司通过合法存有本人信息的机构收集本人信息，可进行相关处理（包括但不限于整理、保存、加工、提供）并向本人出具报告。收集信息的范围包括但不限于身份信息、联系信息、交易信息、履约信息。
        </p>

        <p className="font">（二）同意授权合法存有本人信息的机构向贵司提供本人上述信息。</p>
        <br />
        <p className="line font">特别声明：</p>

        <p className="font">
        本授权书经接受后即时生效，且效力具有独立性，不因相关业务合同或条款无效或被撤销而无效或失效，本授权一经作出，便不可撤消。
        </p>

        <p className="font">
        本授权书签订地为中华人民共和国，本授权书的成立、生效、履行、解释及争议解决，适用于中华人民共和国法律法规（不包括港澳台地区的法律法规及冲突法）。若您和被授权人之间发生任何争议，应友好协商解决；协商不成的，您与被授权人均同意以本授权书签订地人民法院为管辖法院。
        </p>

        <p className="font">
        本人已知悉本授权书全部内容（特别是加粗字体内容）的含义及因此产生的法律效力，自愿作出以上授权、承诺及声明。本授权书是本人真实意思表示，本人同意承担由此带来的一切法律后果。
        </p>
      </div>
    )
  }
}
export default MeasurementCard