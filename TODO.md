# TODO

## Build

- [x] Change mock IDM server to have same signature as the real one
- [ ] Include duid in server props [FEV-1051](https://simplybusiness.atlassian.net/browse/FEV-1051)
- [ ] Check spike app against Staging IDM endpoint
- [ ] Diff the communication between Provider and your adaptor (prefer EventEmitter, but will see what works best in common)
- [ ] Create a Provider in `mobius-journey` which polls IDM API, along with a dummy intervention (or real one from your package) to smoke test
- [ ] Update InterventionWrapper to call `/intervention/shown`

## Productionise

- [ ] After successful testing, potentially move/copy that into interventions package (haven’t decided whether it makes more sense in services yet)
- [ ] Link with CSD and implement one of their interventions
