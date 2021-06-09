// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Election {
    
    struct  Constituency {
        string name;
        uint maleVoteCount;
        uint femaleVoteCount;
        uint otherVoteCount;
    }
   
    struct  PollingBooth {
        string name;
        address pollingBoothId;
        uint maleVoteCount;
        uint femaleVoteCount;
        uint otherVoteCount;
    }
   
    struct  Citizen {
        string voterId;
        string name;
        address boothVotedAt;
        bool hasVoted;
        Gender gender;
        uint constituencyId;
    }
    
    struct Candidate {
        string voterId;
        uint constituencyId;
        uint voteCount;
    }
    
   enum Gender {MALE,FEMALE,OTHER}
   bool public electionStarted;
   bool public electionCompleted;
   uint public countOfConstituencies;
   uint public countOfPollingBooths;
   uint public countOfCitizens;
   uint public countOfCandidates;
   uint public totalVotesCasted;
   address public chiefOfElectionCommission;
   
    PollingBooth[] pollingBooths;
    Citizen[] citizens;
    Constituency[] constituencies;
    Candidate[] candidates;
    
    mapping(string => uint) public citizensMapping;
    mapping(string => uint) public constituenciesMapping;
    mapping(address => uint) public pollingBoothsMapping;
    mapping(string => uint) public candidatesMapping;

    constructor (){
        chiefOfElectionCommission=msg.sender;
    }
    
    function addConstituency(string memory _name) public{
        require(electionStarted==false,"The election has already started");
        require(electionCompleted==false,"The election has been completed");
        require(chiefOfElectionCommission==msg.sender,"Only Chief Of Election Commission can create a Constituency");
        require(constituenciesMapping[_name]==0,"The Constituency already exists");
        
        constituenciesMapping[_name]=countOfConstituencies+1;
        countOfConstituencies+=1;
        constituencies.push(Constituency({
            name:_name,
            maleVoteCount:0,
            femaleVoteCount:0,
            otherVoteCount:0
        }));
    }
    
    function addPollingBooth(string memory _name,address _pollingBoothId) public{
        require(electionStarted==false,"The election has already started");
        require(electionCompleted==false,"The election has been completed");
        require(chiefOfElectionCommission==msg.sender,"Only Chief Of Election Commission can create a PollingBooth");
        require(pollingBoothsMapping[_pollingBoothId]==0,"The PollingBooth already exists");
        
        pollingBoothsMapping[_pollingBoothId]=countOfPollingBooths+1;
        countOfPollingBooths+=1;
        pollingBooths.push(PollingBooth({
            name:_name,
            pollingBoothId:_pollingBoothId,
            maleVoteCount:0,
            femaleVoteCount:0,
            otherVoteCount:0
        }));
    }
    
    function addCitizen(string memory _voterId,string memory _name,uint gender,uint _constituencyId) public {
        require(electionStarted==false,"The election has already started");
        require(electionCompleted==false,"The election has been completed");
        require(chiefOfElectionCommission==msg.sender,"Only Chief Of Election Commission can create a Citizen");
        require(bytes(constituencies[_constituencyId].name).length!=0,"Invalid ConstituencyId");
        require(bytes(_voterId).length!=0,"The VoterId cannot be empty");
        require(bytes(_name).length!=0,"The Name cannot be empty");
        require(gender<3,"The gender can only be MALE/FEMALE/OTHER");
        require(citizensMapping[_voterId]==0,"The Citizen already exists");
        
        citizensMapping[_voterId]=countOfCitizens+1;
        countOfCitizens+=1;
        citizens.push(Citizen({
            name:_name,
            voterId:_voterId,
            boothVotedAt:address(0),
            hasVoted:false,
            gender:Gender(gender),
            constituencyId:_constituencyId
        }));
    }
    
    function addCandidate(string memory _voterId,uint _constituencyId) public {
        require(electionStarted==false,"The election has already started");
        require(electionCompleted==false,"The election has been completed");
        require(chiefOfElectionCommission==msg.sender,"Only Chief Of Election Commission can create a Candidate");
        require(bytes(constituencies[_constituencyId].name).length!=0,"Invalid ConstituencyId");
        require(bytes(_voterId).length!=0,"The VoterId cannot be empty");
        require(citizensMapping[_voterId]!=0,"There doesnot exist any citizen with the given voterId.Only citizens can contest for election");
        require(candidatesMapping[_voterId]==0,"A candidate already exists with the following voterId. Cannot create a new candidate");
        candidatesMapping[_voterId]=countOfCandidates+1;
        countOfCandidates+=1;
        candidates.push(Candidate({
            voterId:_voterId,
            constituencyId:_constituencyId,
            voteCount:0
        }));
    }
    
    function startElection() public{
        require(electionStarted==false,"The election has already started");
        require(electionCompleted==false,"The election has already been completed");
        require(chiefOfElectionCommission==msg.sender,"Only Chief Of Election Commission can start the election");
        require(countOfPollingBooths!=0,"No PollingBooths have been created");
        require(countOfConstituencies!=0,"No Constituencies have been created");
        require(countOfCitizens!=0,"No Citizens have been created");
        electionStarted=true;
    }
    
    function endElection() public{
        require(electionStarted==true,"The election has not yet started");
        require(electionCompleted==false,"The election has already been completed");
        require(chiefOfElectionCommission==msg.sender,"Only Chief Of Election Commission can end the election");
        electionCompleted=true;
    }
    
    function castVote(uint _constituencyId,string memory _candidateVoterId,string memory _voterId) public{
        require(electionStarted==true,"The election has not yet started");
        require(electionCompleted==false,"The election has completed");
        require(bytes(constituencies[_constituencyId-1].name).length!=0,"Invalid ConstituencyId");
        require(bytes(_candidateVoterId).length!=0,"The VoterId of the Candidate cannot be empty");
        require(bytes(_voterId).length!=0,"The VoterId cannot be empty");
        require(citizensMapping[_voterId]!=0,"There doesnot exist any citizen with the given voterId");
        require(candidatesMapping[_candidateVoterId]!=0,"There doesnot exist any candidate with the following voterID");
        require(citizens[citizensMapping[_voterId]-1].hasVoted==false,"The voter has already voted.You cannot vote again");
        require(citizens[citizensMapping[_voterId]-1].constituencyId==_constituencyId,"The voter cannot vote for another Constituency");
        require(candidates[candidatesMapping[_candidateVoterId]-1].constituencyId==_constituencyId,"The vote can only be casted to a candidate who is contesting in the voter's constituency");
        require(pollingBoothsMapping[msg.sender]!=0,"The polling booth that you are voting from is invalid");
        
        citizens[citizensMapping[_voterId]-1].hasVoted=true;
        candidates[candidatesMapping[_candidateVoterId]-1].voteCount++;
        totalVotesCasted++;
        if(citizens[citizensMapping[_voterId]-1].gender==Gender.MALE){
            constituencies[_constituencyId-1].maleVoteCount++;
            pollingBooths[pollingBoothsMapping[msg.sender]-1].maleVoteCount++;
        }else if(citizens[citizensMapping[_voterId]-1].gender==Gender.FEMALE){
            constituencies[_constituencyId-1].femaleVoteCount++;
            pollingBooths[pollingBoothsMapping[msg.sender]-1].femaleVoteCount++;
        }else{
            constituencies[_constituencyId-1].otherVoteCount++;
            pollingBooths[pollingBoothsMapping[msg.sender]-1].otherVoteCount++;
        }
    }
    
    function getConstituencyDetails(uint _constituencyId) public view returns (Constituency memory) {
        require(bytes(constituencies[_constituencyId-1].name).length!=0,"Invalid ConstituencyId");
        
        return constituencies[_constituencyId-1];
    }
    
    function getPollingBoothDetails(uint _pollingBoothId) public view returns (PollingBooth memory){
        require(bytes(pollingBooths[_pollingBoothId-1].name).length!=0,"Invalid PollingBoothId");
        
        return pollingBooths[_pollingBoothId-1];
    }
    
    function getCitizenDetails(string memory _voterId) public view returns (Citizen memory){
        require(bytes(_voterId).length!=0,"The VoterId cannot be empty");
        require(citizensMapping[_voterId]!=0,"There doesnot exist any citizen with the given voterId");
        
        return citizens[citizensMapping[_voterId]-1];
    }
    
    function getConstituencyOfCandidate(string memory _candidateVoterId) public view returns (Constituency memory){
        require(bytes(_candidateVoterId).length!=0,"The VoterId cannot be empty");
        require(citizensMapping[_candidateVoterId]!=0,"There doesnot exist any citizen with the given voterId.A candidate has to be a citizen");
        require(candidatesMapping[_candidateVoterId]!=0,"There doesnot exist any candidate with the following voterID. Please check that the citizen has contested for elections");
        
        return constituencies[candidates[candidatesMapping[_candidateVoterId]-1].constituencyId-1];
    }
    
    function getCandidateDetails(string memory _candidateVoterId) public view returns (Candidate memory){
        require(electionStarted==true,"The election has not yet started");
        require(electionCompleted==true,"The election has not yet completed");
        require(bytes(_candidateVoterId).length!=0,"The VoterId cannot be empty");
        require(citizensMapping[_candidateVoterId]!=0,"There doesnot exist any citizen with the given voterId");
        require(candidatesMapping[_candidateVoterId]!=0,"There doesnot exist any candidate with the following voterID. Please check that the citizen has contested for elections");
        
        return candidates[candidatesMapping[_candidateVoterId]-1];
    }
    
    function getWinningCandidate(uint _constituencyId) public view returns (Candidate memory){
        require(electionStarted==true,"The election has not yet started.You cannot get the winning candidate details before the election is over");
        require(electionCompleted==true,"The election has not yet completed.You can view the winning candidate details once the election gets completed");
        require(bytes(constituencies[_constituencyId-1].name).length!=0,"The ConstituencyId provided is invalid or the Constituency does not exist");
        
        int winningCandidateIndex=-1;
        bool isTied=false;
        for(uint i=0;i<countOfCandidates;++i){
            if(candidates[i].constituencyId==_constituencyId){
                if(winningCandidateIndex==-1){
                    winningCandidateIndex=int(i);
                }else if(candidates[uint(winningCandidateIndex)].voteCount==candidates[i].voteCount){
                    isTied=true;
                }else if(candidates[uint(winningCandidateIndex)].voteCount<candidates[i].voteCount){
                    winningCandidateIndex=int(i);
                    isTied=false;
                }
            }
        }
        
        require(isTied==false,"The results were tied");
        require(winningCandidateIndex!=-1,"No candidates registered for the Constituency");
        
        return candidates[uint(winningCandidateIndex)];
    }
}