/**
 *
 * @Copyright 2025 VOID SOFTWARE, S.A.
 *
 */

import type { FunctionComponent } from 'react';
import { AuthenticationService } from '../authentication/AuthenticationService';
import AppLogo from '../assets/images/full-logo-dark.svg';

type OwnProps = {};

const topbar: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const {} = props;

    return (
        <div className="topbar">
            <AppLogo />
            <button type="button" onClick={AuthenticationService.logout}>
                Logout
            </button>
        </div>
    );
};

export default topbar;
