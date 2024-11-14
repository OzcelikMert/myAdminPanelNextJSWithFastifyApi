import { IRouteChangeParamUtil } from 'types/utils/route.util';

const change = async (params: IRouteChangeParamUtil) => {
  if (params.props.router.asPath != params.path) {
    await new Promise((resolve) => {
      params.props.setStateApp(
        {
          isRouteChanged: false,
          isPageLoading: true,
        },
        () => resolve(1)
      );
    });
  }

  return await params.props.router.push(params.path, params.as ?? params.path, {
    shallow: true,
  });
};

export const RouteUtil = {
  change: change,
};
