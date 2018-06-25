const sitesFetchStartedType = 'SITES_FETCH_STARTED';
const sitesReceivedType = 'SITES_RECEIVED';
const siteReceivedType = 'SITE_RECEIVED';
const siteAddedType = 'SITE_ADDED';
const siteUpdatedType = 'SITE_UPDATED';
const siteDeletedType = 'SITE_DELETED';
const siteUserAddedType = 'SITE_USER_ADDED';
const siteUserRemovedType = 'SITE_USER_REMOVED';
const setCurrentSiteType = 'SET_CURRENT_SITE';

const sitesFetchStarted = () => ({
  type: sitesFetchStartedType,
});

const sitesReceived = sites => {
	console.log("\n\nsitesReceived:\t" + JSON.stringify(sites));
	return {
	  type: sitesReceivedType,
	  sites,
	};
}

const siteReceived = sites => {
	console.log("\n\nsiteReceived:\t" + JSON.stringify(sites));
	return {
	  type: siteReceivedType,
	  sites,
	};
}

const siteAdded = site => ({
  type: siteAddedType,
  site,
});

const siteUpdated = site => ({
  type: siteUpdatedType,
  siteId: site.id,
  site,
});

const siteDeleted = siteId => ({
  type: siteDeletedType,
  siteId,
});

const siteUserAdded = site => ({
  type: siteUserAddedType,
  site,
});

const siteUserRemoved = site => ({
  type: siteUserRemovedType,
  site,
});

const setCurrentSite = siteId => ({
  type: setCurrentSiteType,
  siteId,
});

export {
  sitesFetchStarted, sitesFetchStartedType,
  sitesReceived, sitesReceivedType,
  siteReceived, siteReceivedType,
  siteAdded, siteAddedType,
  siteUpdated, siteUpdatedType,
  siteDeleted, siteDeletedType,
  siteUserAdded, siteUserAddedType,
  siteUserRemoved, siteUserRemovedType,
  setCurrentSiteType, setCurrentSite,
};
