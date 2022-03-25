import styled  from 'styled-components';

export const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    .styled-checkbox {
        position: relative;
        min-width: 2em;
        min-height: 2em;
        color: #000;
        border: 1px solid #bdc1c6;
        border-radius: 4px;
        appearance: none;
        outline: 0;
        cursor: pointer;
        transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
        margin-right: 20;
    
        &::before {
            position: absolute;
            content: '';
            display: block;
            top: 4px;
            left: 8px;
            width: 8px;
            height: 14px;
            border-style: solid;
            border-color: #fff;
            border-width: 0 3px 3px 0;
            transform: rotate(45deg);
            opacity: 0;
        }

        &:checked {
            color: #fff;
            border-color: rgba(107,0,155,0.6);
            background: rgb(107,0,155);
            &::before {
              opacity: 1;
            }
            ~ label::before {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
        }
    }

    label {
        position: relative;
        cursor: pointer;
        font-size: .825em;
        font-weight: 600;
        padding: 0 0.25em 0;
        user-select: none;
        margin-left: 10px;

        &::before {
            position: absolute;
            content: attr(data-content);
            color: #9c9e9f;
            clip-path: polygon(0 0, 0 0, 0% 100%, 0 100%);
            text-decoration: line-through;
            text-decoration-thickness: 3px;
            text-decoration-color: #000;
            transition: clip-path 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
    }
`;