
import './select.css'
import { ChangeEventHandler, ReactNode } from "react";


interface Props {
    onChange: ChangeEventHandler<HTMLSelectElement>;
    data_test_id: string;
    name: string;
    children: ReactNode
}

export const Select = ({ data_test_id, name, onChange, children }: Props): JSX.Element => {
    return (
        <select data-test-id={data_test_id} name={name} defaultValue="all" onChange={onChange}>
            {children}
        </select>
    )
}
