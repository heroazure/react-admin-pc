import React, { Component, createRef } from 'react'
import { Form, Button } from 'antd'
import { SearchOutlined, RollbackOutlined } from '@ant-design/icons'
import styles from './style.module.scss'

const { Item } = Form
export default class extends Component {
  static Item = Item
  static defaultProps = {
    showSearch: true,
    showReset: true
  }
  searchRef = createRef()
  onValuesChange = (changedValues, allValues) => {
    const { triggerSearchItems, onChange, store } = this.props
    if (onChange) {
      onChange(changedValues, triggerSearchItems, allValues)
    } else {
      store?.$setParams?.(changedValues, triggerSearchItems, allValues)
    }
  }
  search = () => {
    const { onSearch, store } = this.props
    if (onSearch) {
      onSearch()
    } else {
      store?.$search?.()
    }
  }
  reset = () => {
    const { onReset, store, triggerSearchItems } = this.props
    const form = this.searchRef.current
    form.resetFields()
    if (onReset) {
      onReset(null, triggerSearchItems)
    } else {
      store?.$setParams?.(null, triggerSearchItems)
    }
  }
  setStoreInitialParams = () => {
    const { store, initialValues } = this.props
    Object.keys(initialValues || {}).forEach(name => {
      store?.$initParams?.(name, initialValues[name])
    })
  }
  componentWillUnmount() {
    const { store, onReset, triggerSearchItems } = this.props
    if (onReset) {
      onReset(null, triggerSearchItems)
    } else {
      store?.$resetParams?.(null, triggerSearchItems)
    }
  }
  componentDidMount() {
    const { onInit, store } = this.props
    if (store) {
      store?.$initSearchBar?.(this.searchRef.current)
    }
    if (onInit) {
      onInit(this.searchRef.current)
    }
  }
  render() {
    const { children, showSearch, showReset, initialValues, extra } = this.props
    this.setStoreInitialParams()
    return (
      <Form
        ref={this.searchRef}
        layout="inline"
        initialValues={initialValues}
        onValuesChange={this.onValuesChange}
        className={styles.search_bar}
      >
        {children}
        {showSearch && (
          <Item>
            <Button type="primary" icon={<SearchOutlined />} onClick={this.search}>
              搜索
            </Button>
          </Item>
        )}
        {showReset && (
          <Item>
            <Button type="dashed" icon={<RollbackOutlined />} onClick={this.reset}>
              重置
            </Button>
          </Item>
        )}
        {extra}
      </Form>
    )
  }
}
