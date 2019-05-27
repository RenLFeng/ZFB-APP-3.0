import React, { Component } from 'react'
import Dialog from '../../components/Dialog/index'
import Loader from '../../components/Loader/index'
import Toast from '../../components/_toast/index'
import { dispatch, connect } from '../../redux/core'

const mapState = rootState => ({
  T: rootState.TEST
})
class index extends Component {
  state = {
    dialogIsShow: false,
    loaderIsShow: false
  }
  toggDialog = () => {
    const { dialogIsShow } = this.state
    this.setState({
      dialogIsShow: !dialogIsShow
    })
  }
  toggLoader = () => {
    const { loaderIsShow } = this.state
    this.setState({
      loaderIsShow: !loaderIsShow
    })
  }
  antToggLoader = () => {
    Toast.info('Toast without mask !!!', 3000, null)
  }

  handleXToast = () => {
    Toast.info('网络异常', 1000)
  }

  handleIncreaseOne = () => {
    dispatch.TEST.increment(1)
  }

  render() {
    const { dialogIsShow, loaderIsShow } = this.state
    const { money } = this.props.T
    return (
      <div>
        <p onClick={this.toggDialog}> click show dialog</p>
        <p onClick={this.toggLoader}> click show loader</p>
        <hr />
        <p
          onClick={() => {
            Toast.info('网络异常', 10000)
          }}
        >
          网络异常
        </p>
        <hr />
        <p>TEST modeels money:{money}</p>
        <p onClick={this.handleIncreaseOne}>add A +1 </p>
        <Dialog handleClose={this.toggDialog} isShow={dialogIsShow} text={'lorem'} />
        {loaderIsShow && <Loader />}
      </div>
    )
  }
}

export default connect(mapState)(index)
