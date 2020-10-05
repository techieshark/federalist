<script>
  import Modal from './Modal.svelte';
  import SectionHeader from './SectionHeader.svelte';
  import { createDomain, destroyDomain } from '../lib/api';

  export let siteId;
  export let domains = [];

  domains = [
    {
      id: 1, name: 'foo.bar.gov', branch: 'main', service: 'foo.bar.gov-ext', status: 'Success',
    },
  ];

  let isModalOpen = false;
  let error = '';
  let domain = '';
  let branch = '';
  $: serviceName = `${domain}-ext`;

  function showModal() {
    isModalOpen = true;
  }

  function hideModal() {
    isModalOpen = false;
    domain = '';
    branch = '';
    error = '';
  }

  async function handleCreateDomain() {
    try {
      const result = await createDomain(siteId, { domain, branch, serviceName });
      domains = [...domains, result];
      hideModal();
    } catch (err) {
      error = err.message;
    }
  }

  async function handleDestroyDomain(domainId) {
    try {
      await destroyDomain(domainId);
      domains = domains.filter((d) => d.id !== domainId);
      // notify success
    } catch (err) {
      // notify error
    }
  }
</script>

<SectionHeader>
  Custom domains
  <span slot="actions">
    <button on:click={showModal}>Add</button>
  </span>
</SectionHeader>
<div class="grid-row padding-x-1">
  {#if domains && domains.length > 0}
    <table class="usa-table usa-table--borderless width-full margin-top-0">
      <thead>
        <tr>
          <th scope="col">Domain</th>
          <th scope="col">Branch</th>
          <th scope="col">Service Name</th>
          <th scope="col">Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each domains as domain}
          <tr>
            <th scope="row">{domain.name}</th>
            <td>{domain.branch}</td>
            <td>{domain.service}</td>
            <td>{domain.status}</td>
            <td class="text-right">
              {#if domain.status === 'Success' }<button on:click={() => handleDestroyDomain(domain.id)}>Delete</button>{/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
{/if}
</div>

{#if isModalOpen}
  <Modal>
    <form
      class="usa-form width-tablet padding-1"
      on:submit|preventDefault={handleCreateDomain}>
      <fieldset class="usa-fieldset">
        <legend>
          Add a custom domain
        </legend>
        <div class="text-red minh-6" aria-live="polite">
          {#if error}
            There was a problem creating the domain: {error}
          {/if}
        </div>

        <label class="usa-label" for="domain">Domain</label>
        <input
          class="usa-input"
          name="domain"
          id="domain"
          type="text"
          required
          bind:value={domain} />

        <label class="usa-label" for="branch">Branch</label>
        <input
          class="usa-input"
          name="branch"
          id="branch"
          type="text"
          required
          bind:value={branch} />

        <label class="usa-label" for="serviceName">Service Name</label>
        <input
          class="usa-input"
          name="serviceName"
          id="serviceName"
          type="text"
          required
          bind:value={serviceName}
          disabled />

        <div class="grid-row grid-gap-sm">
          <input
            class="usa-button usa-button--primary grid-col"
            type="submit"
            value="Add" />
          <input
            class="usa-button usa-button--base grid-col margin-x-0"
            type="reset"
            value="Cancel"
            on:click|preventDefault={hideModal} />
        </div>
      </fieldset>
    </form>
  </Modal>
{/if}