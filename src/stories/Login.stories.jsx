import React from 'react';
import { Login } from './Login';
import { MemoryRouter, Route } from 'react-router-dom';
import { LinkTo } from '@storybook/addon-links/react';

export default {
  title: 'Auth/Login',
  component: Login
}

const withMemoryRouter = (StoryComponent, { parameters }) => {
    const { currentURL } = parameters;
    if (!currentURL) {
        return <StoryComponent />;
    }
    const { path, route, redirectComponent, redirectStory } = currentURL;
    if (!redirectComponent && !redirectStory) {
      return (
        <MemoryRouter initialEntries={[encodeURI(route)]}>
            <Route path={path}>
              <StoryComponent />
            </Route>
        </MemoryRouter>
      );
    }
    return (
      <MemoryRouter initialEntries={[encodeURI(route)]}>
        <Route path={path}>
          <LinkTo kind={redirectComponent} story={redirectStory} />
        </Route>
      </MemoryRouter>
    );
};

const Template = (args) => <Login {...args} />;
export const successLogin = Template.bind({});
successLogin.decorators = [ withMemoryRouter ];
successLogin.parameters = {
  currentURL: {
    route: '/',
    path: '/',
    redirectComponent: 'Common/Landing',
    redirectStory: 'defaultStory'
  }
}