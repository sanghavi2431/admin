import React from 'react';
import { Table } from '@/components/ui';
import parse from 'html-react-parser';

const { Tr, Th, Td, THead, TBody } = Table

const DemoComponentApi = ({hideApiTitle, api, keyText = 'Prop'}) => {
    return (
        <div>
            {(api.length > 0 && !hideApiTitle) && <h4>API</h4>}
            <div className="mt-4">
                {
                    api.map(comp => (
                        <div key={`api-${comp.component}`}>
                            <h6 className="mb-3">{comp.component}</h6>
                            <Table className={`demo-api-table ${api.length > 1 ? 'mb-8' : ''}`}>
                                <THead>
                                    <Tr>
                                        <Th>{keyText}</Th>
                                        <Th>Description</Th>
                                        <Th>Type</Th>
                                        <Th>Default</Th>
                                    </Tr>
                                </THead>
                                <TBody>
                                    {
                                        comp.api.map(item => (
                                            <Tr key={`row-${item.propName}`}>
                                                <Td className="font-semibold">{item.propName}</Td>
                                                <Td>{parse(item.desc)}</Td>
                                                <Td>{parse(item.type)}</Td>
                                                <Td>{parse(item.default)}</Td>
                                            </Tr>
                                        ))
                                    }
                                </TBody>
                            </Table>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DemoComponentApi
