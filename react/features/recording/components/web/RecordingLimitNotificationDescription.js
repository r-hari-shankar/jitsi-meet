// @flow

import React from 'react';

import { translate, translateToHTML } from '../../../base/i18n';
import { connect } from '../../../base/redux';

/**
 * The type of the React {@code Component} props of {@link RecordingLimitNotificationDescription}.
 */
type Props = {
    /**
     * The limit of time for the recording.
     */
    _limit: number,

    /**
     * The name of the payed app with unlimited recordings.
     */
    _payedAppName: string,

    /**
     * The URL to the payed app with unlimited recordings.
     */
    _payedAppURL: string,

    /**
     * True if the notification is related to the livestreaming and false if not.
     */
    isLiveStreaming: Boolean,

    /**
     * Invoked to obtain translated strings.
     */
    t: Function
};

/**
 * A component that renders the description of the notification for the recording initiator.
 *
 * @param {Props} props - The props of the component.
 * @returns {Component}
 */
function RecordingLimitNotificationDescription(props: Props) {
    const { _limit, _payedAppName, _payedAppURL, isLiveStreaming, t } = props;

    return (
        <span>
            {
                translateToHTML(
                    t, 
                    `${isLiveStreaming ? 'liveStreaming' : 'recording'}.limitNotificationDescriptionWeb`, {
                        limit: _limit,
                        app: _payedAppName,
                        url: _payedAppURL
                    })
            }
        </span>
    );
}


/**
 * Maps part of the Redix state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Props}
 */
function _mapStateToProps(state): $Shape<Props> {
    const { recordingLimit = {} } = state['features/base/config'];
    const { limit: _limit, payedAppName: _payedAppName, payedAppURL: _payedAppURL } = recordingLimit;

    return {
        _limit,
        _payedAppName,
        _payedAppURL
    };
}

export default translate(connect(_mapStateToProps)(RecordingLimitNotificationDescription));
