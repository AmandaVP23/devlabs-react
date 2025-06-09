/**
 *
 * @Copyright 2025 VOID SOFTWARE, S.A.
 *
 */

import type { FunctionComponent } from 'react';
import { AuthenticationService } from '../authentication/AuthenticationService';

type OwnProps = {};

const sidebar: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const {} = props;

    return (
        <div className="sidebar">
            <button type="button" onClick={AuthenticationService.logout}>
                Logout
            </button>
        </div>
    );
};

export default sidebar;
