<div class="modal fade" id="modalDocuments" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header modaldelichef" >
                <h4 class="modal-title" id="myModalLabel">Documents <i class="fa fa-folder-open"></i></h4>
                <button type="button"  class="btn close-documents" data-dismiss="modal">x</button>
              </div>
              
              <div class="col-sm-12 formulario-documents">
                    <form id="formDocuments" class="form-horizontal" enctype="multipart/form-data">
                    {{ csrf_field() }}
                      <div class="row">
                          <div class="col-sm-12">
                              <div class="row">
                                  <div class="col-sm-9 form-group">
                                  <h6>Document:</h6>
                                    <input type="file" class="dropify" name="document" id="doc" data-default-file="" data-show-remove="false" multiple>
                                  </div>
                                  <div class="col-sm-3 form-group">
                                  <h6></h6>
                                    <button type="submit" class="btn btn-success" id="btn-save-documents" value="add">Save</button>
                                  </div>
                              </div>
                          </div>
                       </div>
                      <hr>
                  </form>
                  <input type="hidden" id="client_id_document" name="client_id_document">

              </div>

              <div class="col-sm-12 table-documents">
                  <div class="table-responsive">
                      <table class="table table-striped text-center" id="tag_container">
                          <thead class="text-white thead-yasc">
                              <tr>
                                  <th>Document</th>
                              
                              </tr>
                          </thead>
                          <tbody id = 'document-list'>

                          </tbody>
                      </table>
                </div>

              </div>
          </div>
      </div>
</div>