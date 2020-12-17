import Card from 'components/core/Card';
import { IRootState } from 'helpers/types/state';
// import ListCommunityManagers from 'components/ListCommunityManagers';
import React from 'react';
import { Button } from 'react-native-paper';
import { connect, ConnectedProps } from 'react-redux';

interface ICommunityManagersProps {
    managers: string[];
}
const mapStateToProps = (state: IRootState) => {
    const { user } = state;
    return { user };
};
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & ICommunityManagersProps;

class CommunityManagers extends React.Component<Props, object> {
    render() {
        const { managers } = this.props;

        return (
            <>
                <Card style={{ marginVertical: 15 }}>
                    <Card.Title
                        title=""
                        style={{ backgroundColor: '#f0f0f0' }}
                        subtitleStyle={{ color: 'grey' }}
                        subtitle="COMMUNITY LEADERS"
                    />
                    <Card.Content>
                        {/* <ListCommunityManagers managers={managers} /> */}
                        <Button
                            mode="outlined"
                            style={{ width: '100%' }}
                            disabled
                        >
                            Add Community Leader
                        </Button>
                    </Card.Content>
                </Card>
            </>
        );
    }
}

export default connector(CommunityManagers);
