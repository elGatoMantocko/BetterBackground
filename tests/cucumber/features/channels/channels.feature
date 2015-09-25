Feature: Browse Channels
  As a public user
  I want to browse all channels

  # The background will be run for every scenario
  #Background:
    #Given I am signed out

  @dev
  Scenario: There are no channels in the collection
    When I navigate to "/"
    Then I should see "0" channels 
