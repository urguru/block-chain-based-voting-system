// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Election {
    struct Constituency {
        string constituencyId;
        uint32 voteCount;
    }

    struct Citizen {
        string voterId;
        bool hasVoted;
        string constituencyId;
    }

    struct Candidate {
        string voterId;
        string constituencyId;
    }

    uint32[] candidateVoteCount;

    uint32 public electionStatus;
    uint32 public countOfConstituencies;
    uint32 public countOfCitizens;
    uint32 public countOfCandidates;
    address public cec;
    address[] public pollingBooths;

    Citizen[] citizens;
    Constituency[] constituencies;
    Candidate[] candidates;

    mapping(string => uint32) public citizenMapping;
    mapping(string => uint32) public constituencyMapping;
    mapping(address => bool) public whitelistedPollingBooths;
    mapping(string => uint32) public candidateMapping;

    constructor() {
        cec = msg.sender;
        electionStatus = 0;
    }

    function compareStrings(string memory a, string memory b)
        public
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    function addConstituency(string memory _constituencyId) public {
        require(electionStatus == 0, "ER_ELECTION_NOT_IN_NOT_STARTED_STATE");
        require(msg.sender == cec, "ER_FORBIDDEN");
        require(
            constituencyMapping[_constituencyId] == 0,
            "ER_CONSTITUENCY_ALREADY_EXISTS"
        );

        constituencyMapping[_constituencyId] = countOfConstituencies + 1;
        countOfConstituencies += 1;
        constituencies.push(
            Constituency({constituencyId: _constituencyId, voteCount: 0})
        );
    }

    function whitelistPollingBooth(address _pollingBoothId) public {
        require(electionStatus == 0, "ER_ELECTION_NOT_IN_NOT_STARTED_STATE");
        require(cec == msg.sender, "ER_FORBIDDEN");
        pollingBooths.push(_pollingBoothId);
        whitelistedPollingBooths[_pollingBoothId] = true;
    }

    function addCitizen(string memory _voterId, string memory _constituencyId)
        public
    {
        require(electionStatus == 0, "ER_ELECTION_NOT_IN_NOT_STARTED_STATE");
        require(whitelistedPollingBooths[msg.sender] == true, "ER_FORBIDDEN");
        require(
            constituencyMapping[_constituencyId] != 0,
            "ER_INVALID_CONSTITUENCY"
        );
        require(bytes(_voterId).length != 0, "ER_INVALID_VOTER_ID");
        require(citizenMapping[_voterId] == 0, "ER_CITIZEN_ALREADY_EXISTS");

        citizenMapping[_voterId] = countOfCitizens + 1;
        countOfCitizens += 1;
        citizens.push(
            Citizen({
                voterId: _voterId,
                constituencyId: _constituencyId,
                hasVoted: false
            })
        );
    }

    function addCandidate(string memory _voterId, string memory _constituencyId)
        public
    {
        require(electionStatus == 0, "ER_ELECTION_NOT_IN_NOT_STARTED_STATE");
        require(cec == msg.sender, "ER_FORBIDDEN");
        require(
            constituencyMapping[_constituencyId] != 0,
            "ER_INVALID_CONSTITUENCY"
        );
        require(citizenMapping[_voterId] != 0, "ER_INVALID_VOTER_ID");
        require(candidateMapping[_voterId] == 0, "ER_CANDIDATE_ALREADY_EXISTS");
        candidateMapping[_voterId] = countOfCandidates + 1;
        countOfCandidates += 1;
        candidates.push(
            Candidate({voterId: _voterId, constituencyId: _constituencyId})
        );
        candidateVoteCount.push(0);
    }

    function startElection() public {
        require(electionStatus == 0, "ER_ELECTION_NOT_IN_NOT_STARTED_STATE");
        require(cec == msg.sender, "ER_FORBIDDEN");
        require(
            countOfConstituencies != 0,
            "No Constituencies have been created"
        );
        require(countOfCitizens != 0, "No Citizens have been created");
        electionStatus = 1;
    }

    function endElection() public {
        require(electionStatus == 1, "ER_ELECTION_NOT_IN_STARTED_STATE");
        require(cec == msg.sender, "ER_FORBIDDEN");
        electionStatus = 2;
    }

    function castVote(string memory _candidateVoterId, string memory _voterId)
        public
    {
        uint32 citizenMappingValue = citizenMapping[_voterId];
        uint32 candidateMappingValue = candidateMapping[_candidateVoterId];
        require(electionStatus == 1, "ER_ELECTION_NOT_IN_STARTED_STATE");
        require(citizenMappingValue != 0, "ER_INVALID_VOTER_ID");
        require(candidateMappingValue != 0, "ER_INVALID_CANDIDATE_VOTER_ID");
        Citizen storage citizen = citizens[citizenMappingValue - 1];
        Candidate storage candidate = candidates[candidateMappingValue - 1];
        require(citizen.hasVoted == false, "ER_ALREADY_VOTED");
        require(
            compareStrings(citizen.constituencyId, candidate.constituencyId),
            "ER_CANNOT_VOTE"
        );
        require(whitelistedPollingBooths[msg.sender] == true, "ER_FORBIDDEN");
        Constituency storage constituency =
            constituencies[constituencyMapping[citizen.constituencyId] - 1];

        citizen.hasVoted = true;
        constituency.voteCount = constituency.voteCount + 1;
        candidateVoteCount[candidateMappingValue - 1]++;
    }

    function getConstituencyDetails(string memory _constituencyId)
        public
        view
        returns (Constituency memory)
    {
        require(
            constituencyMapping[_constituencyId] != 0,
            "ER_INVALID_CONSTITUENCY"
        );
        return constituencies[constituencyMapping[_constituencyId] - 1];
    }

    function isValidPollingBooth(address _pollingBoothId)
        public
        view
        returns (bool)
    {
        return whitelistedPollingBooths[_pollingBoothId];
    }

    function getCitizenDetails(string memory _voterId)
        public
        view
        returns (Citizen memory)
    {
        require(citizenMapping[_voterId] != 0, "ER_INVALID_VOTER_ID");

        return citizens[citizenMapping[_voterId] - 1];
    }

    function getConstituencyIdOfCandidate(string memory _candidateVoterId)
        public
        view
        returns (string memory)
    {
        require(
            candidateMapping[_candidateVoterId] != 0,
            "ER_INVALID_CANDIDATE_VOTER_ID"
        );

        return
            candidates[candidateMapping[_candidateVoterId] - 1].constituencyId;
    }

    function getVotesForCandidate(string memory _candidateVoterId)
        public
        view
        returns (uint32)
    {
        require(electionStatus == 2, "ER_ELECTION_NOT_IN_COMPLETED_STATE");
        require(
            candidateMapping[_candidateVoterId] != 0,
            "ER_INVALID_CANDIDATE_VOTER_ID"
        );

        return candidateVoteCount[candidateMapping[_candidateVoterId] - 1];
    }

    function getElectionStatus() public view returns (uint32){
        return electionStatus;
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getAllConstituencies()
        public
        view
        returns (Constituency[] memory)
    {
        return constituencies;
    }

    function getAllPollingBooths() public view returns (address[] memory) {
        return pollingBooths;
    }
}
