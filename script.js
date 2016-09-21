var tableApp = angular.module('tableApp', []);
var tableCtrl = tableApp.controller('tableController', function ($scope, $filter){
		$scope.predicate = 'marketValueInTargetCcy';
      	$scope.reverse = true;
      	$scope.searchHolding = '';
      	$scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate; 		
    	};
    	$scope.pageSizes = [10,25,50];
  		$scope.filteredItems = [];
  		$scope.groupedItems = [];
 		$scope.itemsPerPage = 10;
  		$scope.pagedItems = [];
  		$scope.currentPage = 0;
  		$scope.selectedType = [];
  		$scope.items = [
			{
				"isAssetClassDescription": "Non-US Equity",
				"productDescription": "Nestle",
				"productSymbol": "NST",
				"marketValueInTargetCcy": 9734.34,
				"todaysGainLossPercentage": 0.89
			},
			{
				"isAssetClassDescription": "US Equity",
				"productDescription": "Target",
				"productSymbol": "TGT",
				"marketValueInTargetCcy": 9765.03,
				"todaysGainLossPercentage": 1.31
			},
			{
				"isAssetClassDescription": "US Equity",
				"productDescription": "Microsoft",
				"productSymbol": "MSFT",
				"marketValueInTargetCcy": 9797.28,
				"todaysGainLossPercentage": 1.63
			},
			{
				"isAssetClassDescription": "US Equity",
				"productDescription": "Apple",
				"productSymbol": "AAPL",
				"marketValueInTargetCcy": 6765.03,
				"todaysGainLossPercentage": 0.45
			},
			{
				"isAssetClassDescription": "Investment Grade Fixed Income",
				"productDescription": "Ayco",
				"productSymbol": "AYCO",
				"marketValueInTargetCcy": 465896.53,
				"todaysGainLossPercentage": 0.00
			},
			{
				"isAssetClassDescription": "US Equity",
				"productDescription": "Procter & Gamble",
				"productSymbol": "PG",
				"marketValueInTargetCcy": 9635.03,
				"todaysGainLossPercentage": 0.82
			},
			{
				"isAssetClassDescription": "US Equity",
				"productDescription": "Coca Cola Co",
				"productSymbol": "CC",
				"marketValueInTargetCcy": 8193.34,
				"todaysGainLossPercentage": 0.21
			},
			{
				"isAssetClassDescription": "US Equity",
				"productDescription": "Chevron",
				"productSymbol": "CVN",
				"marketValueInTargetCcy": 7902.03,
				"todaysGainLossPercentage": -1.31
			},
			{
				"isAssetClassDescription": "US Equity",
				"productDescription": "Alphabet Inc",
				"productSymbol": "ALP",
				"marketValueInTargetCcy": 7769.03,
				"todaysGainLossPercentage": 1.21
			},
			{
				"isAssetClassDescription": "Non-US Equity",
				"productDescription": "Royal Dutch Shell",
				"productSymbol": "RDS",
				"marketValueInTargetCcy": 79765.03,
				"todaysGainLossPercentage": 0.98
			},
			{
				"isAssetClassDescription": "Non-US Equity",
				"productDescription": "Allianz SE",
				"productSymbol": "ALZ",
				"marketValueInTargetCcy": 7211.68,
				"todaysGainLossPercentage": 1.01
			},
			{
				"isAssetClassDescription": "Non-US Equity",
				"productDescription": "Zebra Technology",
				"productSymbol": "ZBR",
				"marketValueInTargetCcy": 811.68,
				"todaysGainLossPercentage": -0.32
			}
        ];
        $scope.holdingTypes = _.uniq(_.pluck($scope.items, 'isAssetClassDescription'));

  		var searchMatch = function (haystack, needle) {
  		  if (!needle) {
  		    return true;
  		  }
  		  return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
  		};
  		
  		// initialize
  		$scope.search = function () {
  		  $scope.filteredItems = $filter('filter')($scope.items, function (item) {
  		    for(var attr in item) {
  		      if (searchMatch(item[attr], $scope.query))
  		        return true;
  		    }
  		    return false;
  		  });
		
  		  $scope.currentPage = 0;
  		  // now group by pages
  		  $scope.groupToPages();
  		};
  		
  		// show items per page
  		$scope.perPage = function () {
  		  $scope.groupToPages();
  		};
  		
  		// calculate page in place
  		$scope.groupToPages = function () {
  		  $scope.pagedItems = [];
  		  
  		  for (var i = 0; i < $scope.filteredItems.length; i++) {
  		    if (i % $scope.itemsPerPage === 0) {
  		      $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
  		    } else {
  		      $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
  		    }
  		  }
  		};

  		$scope.range = function (start, end) {
    	var ret = [];
    	if (!end) {
    	  end = start;
    	  start = 0;
    	}
    	for (var i = start; i < end; i++) {
    	  ret.push(i);
    	}
    	return ret;
  		};
  
  		$scope.prevPage = function () {
  		  if ($scope.currentPage > 0) {
  		    $scope.currentPage--;
  		  }
  		};
  		
  		$scope.nextPage = function () {
  		  if ($scope.currentPage < $scope.pagedItems.length - 1) {
  		    $scope.currentPage++;
  		  }
  		};
  		
  		$scope.setPage = function () {
  		  $scope.currentPage = this.n;
  		};
		
  		$scope.search();
});

tableCtrl.$inject = ['$scope', '$filter'];
