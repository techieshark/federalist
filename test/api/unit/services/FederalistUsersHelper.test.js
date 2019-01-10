const expect = require('chai').expect;
const proxyquire =  require('proxyquire').noCallThru();

const factory = require('../../support/factory');
const MockGitHub = require('../../support/mockGitHub');
const fedUserHelper = proxyquire('../../../../api/services/FederalistUsersHelper', { './GitHub': MockGitHub });

describe('FederalistUsersHelper', () => {
  context('audit18F', () => {
    describe('18F exists', () => {

      let members;
      let federalistUsers;
      let f81;
      const fedUserTeams = ['12345', '54321'];

      beforeEach(() => {
        members = MockGitHub.generateMembers('user');
        MockGitHub.addTeam('12345', members);
        MockGitHub.addOrganization('federalist-users', members);
        MockGitHub.addOrganization('18F', [].concat(members));
        f81 = MockGitHub.getOrganizationMembers('token', '18F');
      });


      it('remove federalist-user not in 18F org', (done) => {
        let auditor_username;

        factory.user()
          .then((user) => {
            auditor_username = user.username;

            federalistUsers = MockGitHub.getOrganizationMembers('token', 'federalist-users');

            expect(f81.length).to.equal(10);
            expect(federalistUsers.length).to.equal(10);

            MockGitHub.addTeamMember('12345', 'non-18F-user');
          })
          .then(() => {
            federalistUsers = MockGitHub.getOrganizationMembers('token', 'federalist-users');
            expect(federalistUsers.length).to.equal(11);
            return fedUserHelper.audit18F({ auditor_username, fedUserTeams })
          })
          .then(() => {
            expect(f81.length).to.equal(10);
            federalistUsers = MockGitHub.getOrganizationMembers('token', 'federalist-users');
            expect(federalistUsers.length).to.equal(10);
            done();
          })
          .catch(done);
      });

      it('no federalist users to remove when 18F users are added', (done) => {
        let auditor_username;

        factory.user()
          .then((user) => {
            auditor_username = user.username;

            federalistUsers = MockGitHub.getOrganizationMembers('token', 'federalist-users');

            expect(f81.length).to.equal(10);
            expect(federalistUsers.length).to.equal(10);

            MockGitHub.addOrganizationMember('18F', 'new18fUser');
            f81 = MockGitHub.getOrganizationMembers('token', '18F');
            expect(f81.length).to.equal(11);
            return fedUserHelper.audit18F({ auditor_username, fedUserTeams })
          })
          .then(() => {
            f81 = MockGitHub.getOrganizationMembers('token', '18F');
            expect(f81.length).to.equal(11);
            federalistUsers = MockGitHub.getOrganizationMembers('token', 'federalist-users');
            expect(federalistUsers.length).to.equal(10);
            done();
          })
          .catch(done);
      });

      it('no users removed if 18F org is empty', (done) => {
        let auditor_username;
        // let members1;

        factory.user()
          .then((user) => {
            auditor_username = user.username;

            federalistUsers = MockGitHub.getOrganizationMembers('token', 'federalist-users');
            expect(federalistUsers.length).to.equal(10);

            MockGitHub.addOrganization('18F', []);
            f81 = MockGitHub.getOrganizationMembers('token', '18F');
            expect(f81.length).to.equal(0);

            return fedUserHelper.audit18F({ auditor_username, fedUserTeams })
          })
          .then(() => {
            expect(f81.length).to.equal(0);
            federalistUsers = MockGitHub.getOrganizationMembers('token', 'federalist-users');
            expect(federalistUsers.length).to.equal(10);
            done();
          })
          .catch(done);
      });
    });
    describe('no 18F', () => {

      let members;
      let federalistUsers;
      let f81;
      const fedUserTeams = ['12345', '54321'];

      beforeEach(() => {
        members = MockGitHub.generateMembers('user');
        MockGitHub.addTeam('12345', members);
        MockGitHub.addOrganization('federalist-users', members);
      });

      // test if 18F fetch generates an error .. then delete shouldnt' happen
      it('no users removed if 18F org is empty', (done) => {
        let auditor_username;

        factory.user()
          .then((user) => {
            auditor_username = user.username;

            federalistUsers = MockGitHub.getOrganizationMembers('token', 'federalist-users');
            expect(federalistUsers.length).to.equal(10);

            return fedUserHelper.audit18F({ auditor_username, fedUserTeams })
          })
          .then(() => {
            federalistUsers = MockGitHub.getOrganizationMembers('token', 'federalist-users');
            expect(federalistUsers.length).to.equal(10);
            done();
          })
      });
    });
  });
});
