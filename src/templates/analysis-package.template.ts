export function getAnalysisOptionsTemplate(): string {
    return getDefaultAnalysisOptionsTemplate();
}

function getDefaultAnalysisOptionsTemplate(): string {

  return `include: package:very_good_analysis/analysis_options.yaml

#Uncomment the following lines to disble any rule 
#linter:
  #rules:
    #public_member_api_docs: false
    `;
}
