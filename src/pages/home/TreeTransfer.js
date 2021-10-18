import React from 'react';
import { Transfer, Tree } from 'antd';

const isChecked = (selectedKeys, eventKey) => selectedKeys.indexOf(eventKey) !== -1;
const generateTree = (treeNodes = [], checkedKeys = []) =>
    treeNodes.map(({ children, ...props }) => ({
        ...props,
        disabled: checkedKeys.includes(props.key),
        children: generateTree(children, checkedKeys),
    }));
export default function ({ dataSource, targetKeys, ...restProps }) {
    const transferDataSource = [];
    function flatten(list = []) {
        list.forEach(item => {
            transferDataSource.push(item);
            flatten(item.children || []);
        });
    }
    flatten(dataSource);
    return (
        <Transfer
            {...restProps}
            targetKeys={targetKeys}
            dataSource={transferDataSource}
            className="tree-transfer"
            render={item => item.title}
            showSelectAll={false}
        >
            {({ direction, onItemSelect, selectedKeys }) => {
                if (direction === 'left') {
                    const checkedKeys = [...selectedKeys, ...targetKeys];
                    return (
                        <Tree
                            blockNode
                            checkable
                            checkStrictly
                            defaultExpandAll
                            checkedKeys={checkedKeys}
                            treeData={generateTree(dataSource, targetKeys)}
                            onCheck={(_, { node: { key } }) => {
                                onItemSelect(key, !isChecked(checkedKeys, key));
                            }}
                            onSelect={(_, { node: { key } }) => {
                                onItemSelect(key, !isChecked(checkedKeys, key));
                            }}
                        />
                    );
                }
            }}
        </Transfer>
    );
}
